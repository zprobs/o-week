import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, LayoutAnimation, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Theme, ThemeStatic } from '../../theme/Colours';
import FormInput from '../ReusableComponents/FormInput';
import Selection from '../ReusableComponents/Selection';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_EVENT, GET_DETAILED_GROUP, GET_GROUP_EVENTS, UPDATE_GROUP } from '../../graphql';
import DatePicker from 'react-native-date-picker';
import { AuthContext, getDefaultImage, saveImage } from '../../context';
import Fonts from '../../theme/Fonts';
import ImagePicker from "react-native-image-crop-picker";

const HEIGHT = Dimensions.get('window').height;
const { colours } = Theme.light;
const {FontWeights, FontSizes} = Fonts;

/**
 * Modal for creating an event accessable only by Leaders through the Group page
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly groupId?: *, readonly groupName?: *, readonly onClose?: *}> & React.RefAttributes<unknown>>}
 */
const NewEventModal = React.forwardRef(({groupId, onClose, groupName}, ref) => {

  const [createEvent] = useMutation(CREATE_EVENT)

  const [name, setName] = useState();
  const [image, setImage] = useState(getDefaultImage());
  const [imageSelection, setImageSelection] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [website, setWebsite] = useState();
  const [startDate, setStartDate] = useState(new Date())
  const [showStartDate, setShowStartDate] = useState(false)
  const [endDate, setEndDate] = useState(new Date())
  const [showEndDate, setShowEndDate] = useState(false)
  const [minimumDate] = useState(new Date(Date.now() - 86400000))
  const {authState} = useContext(AuthContext)

  const [isUploading, setIsUploading] = useState(false);

  const startDateHasShown = useRef(false)
  const endDateHasShown = useRef(false)

  const dateTimeFormat = new Intl.DateTimeFormat('en', {  month: 'short', day: 'numeric', hour: 'numeric', hour12: true, minute: 'numeric', dayPeriod: 'short' })


  const onDone = async () => {
    setIsUploading(true)
    const imageURL = imageSelection ? await saveImage(imageSelection) : image;
    const fields = {};
    fields.image = imageURL;
    fields.email = authState.user.email;
    fields.name = name;
    fields.description = description;
    fields.location = location;
    fields.website = website
    fields.startDate = startDate;
    fields.endDate = endDate;
    fields.hosts = { data: [{ groupId: groupId }] };
    createEvent({
      variables: { data: fields },
      refetchQueries: [{ query: GET_GROUP_EVENTS, variables: { id: groupId } }]
    }).then(() => {
        setIsUploading(false);
        ref.current.close();
      }
    ).catch(e => console.log(e.message));


  };

  function pickImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(selectedImage => {
        setImage(selectedImage.path);
        setImageSelection(selectedImage);
      })
      .catch(result => console.log(result));
  }


  const showStartDatePicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    startDateHasShown.current = true
    setShowStartDate(!showStartDate);
  }

  const showEndDatePicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    endDateHasShown.current = true
    setShowEndDate(!showEndDate);
  }

  const StartDateTitle = () => {
    if (showStartDate) {
      return "Save Start Date"
    } else {
      if (startDateHasShown.current) {
        const [{ value: month },,{ value: day },, {value: hour},,{value: minute},,{value: dayPeriod}] = dateTimeFormat.formatToParts(startDate)
        return `Starts: ${month} ${day} ${hour}:${minute} ${dayPeriod}`;
      }
      return "Start Date"
    }
  }

  const EndDateTitle = () => {
    if (showEndDate) {
      return "Save End Date"
    } else {
      if (endDateHasShown.current) {
        const [{ value: month },,{ value: day },, {value: hour},,{value: minute},,{value: dayPeriod}] = dateTimeFormat.formatToParts(endDate)
        return `Ends: ${month} ${day} ${hour}:${minute} ${dayPeriod}`;
      }
      return "End Date"
    }
  }




  return (
    <Modalize
      ref={ref}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        bounces: false,
      }}
      modalTopOffset={110}
      onClose={onClose}
      tapGestureEnabled={false}
      rootStyle={[StyleSheet.absoluteFill, { minHeight: HEIGHT * 0.4 }]}>
      <View style={{ paddingHorizontal: 20 }}>
        <ModalHeader
          heading="Create event"
          subHeading={`Create an Event for ${groupName}`}
        />
        <View style={styles.content}>
          <ImageBackground
            source={{
              uri: image,
            }}
            style={styles.image}
            imageStyle={styles.avatarImage}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={pickImage}
              style={styles.imageOverlay}>
              <Icon name="pencil" size={26} color={ThemeStatic.white} />
            </TouchableOpacity>
          </ImageBackground>

          <FormInput
            ref={null}
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder={"example: Beach Day"}
            characterRestriction={60}
          />
          <FormInput
            ref={null}
            label="Description"
            placeholder="example: This event is brought to you by our sponsors"
            value={description}
            onChangeText={setDescription}
            multiline
            characterRestriction={200}
          />

          <FormInput
            ref={null}
            label="Location"
            placeholder="example: 321 Bloor St. (optional)"
            value={location}
            onChangeText={setLocation}
            characterRestriction={50}
          />

          <FormInput
            ref={null}
            label="Zoom Link"
            placeholder="example: https://us02web.zoom.us/j/8246295407?pwd=b2FEdF"
            value={website}
            onChangeText={setWebsite}
            characterRestriction={150}
          />

          <Text style={styles.note}>Note* Please use a password-less Invite Link as only users invited to the event are able to join. Always check to see if your link works after creating the event.</Text>

          <Selection
            title={StartDateTitle()}
            onPress={showStartDatePicker}
            accent={true}
          />

          {
            showStartDate ? <DatePicker
              date={startDate}
              onDateChange={setStartDate}
              minimumDate={minimumDate}
            />  : <View style={{height: 10}}/>
          }

          <Selection
            title={EndDateTitle()}
            onPress={showEndDatePicker}
            accent={true}
          />

          {
            showEndDate ? <DatePicker
              date={endDate}
              onDateChange={setEndDate}
              minimumDate={startDate}
            />  : <View style={{height: 10}}/>
          }



          <ButtonColour
            label="Done"
            title="done"
            onPress={onDone}
            loading={isUploading}
            containerStyle={styles.doneButton}
            colour={ThemeStatic.accent}
            light={true}
          />
        </View>
      </View>
    </Modalize>
  )

});

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    height: 100,
    width: 150,
    borderRadius: 5,
    marginTop: 20,
  },
  avatarImage: {
    backgroundColor: colours.placeholder,
  },
  imageOverlay: {
    position: 'absolute',
    height: 100,
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colours.accent,
    opacity: 0.5,
  },
  doneButton: {
    marginVertical: 20,
  },
  note: {
    ...FontWeights.light,
    ...FontSizes.SubText,
    color: colours.text03,
    marginTop: 5,
    marginBottom: 25,
    marginHorizontal: 10
  }

});

export default NewEventModal;
