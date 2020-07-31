import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  LayoutAnimation,
  Text,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Theme, ThemeStatic } from '../../theme/Colours';
import FormInput from '../ReusableComponents/FormInput';
import Selection from '../ReusableComponents/Selection';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import {
  CREATE_EVENT,
  GET_ALL_GROUP_IDS,
  GET_DETAILED_EVENT,
  GET_GROUP_EVENTS,
  UPDATE_EVENT,
} from '../../graphql';
import DatePicker from 'react-native-date-picker';
import { AuthContext, getDefaultImage, saveImage } from '../../context';
import Fonts from '../../theme/Fonts';
import ImagePicker from 'react-native-image-crop-picker';
import { showMessage } from 'react-native-flash-message';

const HEIGHT = Dimensions.get('window').height;
const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 * Modal for creating an event accessable only by Leaders through the Group page
 * @param groupId {string} the host of the event
 * @param onClose {function} a method executed onClose
 * @param groupName {string} The name of host group
 * @param eventId {string} used to update event
 * @param editMode {boolean} if true, then editing an existing event. If false then creating a new one.
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly groupId?: *, readonly groupName?: *, readonly onClose?: *}> & React.RefAttributes<unknown>>}
 */
const NewEventModal = React.forwardRef(
  ({ groupId, onClose, groupName, editMode, eventId }, ref) => {
    const [createEvent, {error: createEventError}] = useMutation(CREATE_EVENT);
    const [updateEvent, {error: updateEventError}] = useMutation(UPDATE_EVENT);
    const [getEvent, { data, error }] = useLazyQuery(GET_DETAILED_EVENT, {
      variables: { id: eventId },
    });
    const [getAllHosts, { data: hostsData, error: hostsError }] = useLazyQuery(
      GET_ALL_GROUP_IDS,
    );

    const [name, setName] = useState();
    const [image, setImage] = useState(getDefaultImage());
    const [imageSelection, setImageSelection] = useState();
    const [description, setDescription] = useState();
    const [location, setLocation] = useState();
    const [website, setWebsite] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [showStartDate, setShowStartDate] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [showEndDate, setShowEndDate] = useState(false);
    const [minimumDate] = useState(new Date(Date.now() - 86400000));
    const { authState } = useContext(AuthContext);

    const [isUploading, setIsUploading] = useState(false);

    const startDateHasShown = useRef(!!editMode);
    const endDateHasShown = useRef(!!editMode);

    if (error) {
      showMessage({
        message: "Server Error",
        description: error.message,
        autoHide: false,
        type: 'warning',
        icon: 'auto'
      });
    }

    if (createEventError) {
      showMessage({
        message: "Could not Create Event",
        description: createEventError.message,
        type: 'danger',
        icon: 'auto'
      });
    }

    if (updateEventError) {
      showMessage({
        message: "Could not Update Event",
        description: updateEventError.message,
        type: 'danger',
        icon: 'auto'
      });
    }

    if (hostsError) {
      showMessage({
        message: "Server Error",
        description: hostsError.message,
        type: 'warning',
        icon: 'auto'
      });
    }

    useEffect(() => {
      if (data) {
        const { event } = data;
        setName(event.name);
        setImage(event.image);
        setDescription(event.description);
        setWebsite(event.website);
        if (event.location.constructor !== Object) setLocation(event.location);
        setStartDate(new Date(event.startDate));
        setEndDate(new Date(event.endDate));
      }
    }, [data]);

    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
      dayPeriod: 'short',
    });

    const heading = editMode ? 'Edit Event' : 'Create Event';
    const displayName = groupName ? groupName : 'everyone';
    const subHeading = editMode
      ? 'Attendees will be notified if you change the date'
      : `Create an Event for ${displayName}`;

    const onDone = async () => {
      setIsUploading(true);
      const imageURL = imageSelection ? await saveImage(imageSelection, null, 'event', eventId) : image;
      const fields = {};
      fields.image = imageURL;
      fields.email = authState.user.email;
      fields.name = name;
      fields.description = description;
      fields.location = location;
      fields.website = website;
      fields.startDate = startDate;
      fields.endDate = endDate;
      if (groupId) {
        fields.hosts = { data: [{ groupId: groupId }] };
      } else {
        if (hostsError) return;
        const IDs = [];
        hostsData.groups.forEach((group) => IDs.push({ groupId: group.id }));
        fields.hosts = { data: IDs };
        console.log(fields.hosts);
      }
      createEvent({
        variables: { data: fields },
        refetchQueries: groupId
          ? [{ query: GET_GROUP_EVENTS, variables: { id: groupId } }]
          : null,
      })
        .then(() => {
          setIsUploading(false);
          ref.current.close();
        })
        .catch((e) => console.log(e.message));
    };

    const onUpdate = async () => {
      setIsUploading(true);
      const { event } = data;
      const imageURL = imageSelection
        ? await saveImage(imageSelection, data.event.image, 'event', eventId)
        : null;
      const fields = {};
      if (imageURL) fields.image = imageURL;
      if (name !== event.name) fields.name = name;
      if (description !== event.description) fields.description = description;
      if (location !== event.location) fields.location = location;
      if (website !== event.website) fields.website = website;
      if (startDate !== event.startDate) fields.startDate = startDate;
      if (endDate !== event.endDate) fields.endDate = endDate;

      if (Object.keys(fields).length !== 0) {
        updateEvent({
          variables: { id: eventId, data: fields },
        })
          .then(() => {
            setIsUploading(false);
            ref.current.close();
          })
          .catch((e) => console.log(e.message));
      } else {
        setIsUploading(false);
        ref.current.close();
      }
    };

    function pickImage() {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then((selectedImage) => {
          setImage(selectedImage.path);
          setImageSelection(selectedImage);
        })
        .catch((result) => console.log(result));
    }

    const showStartDatePicker = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      startDateHasShown.current = true;
      setShowStartDate(!showStartDate);
    };

    const showEndDatePicker = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      endDateHasShown.current = true;
      setShowEndDate(!showEndDate);
    };

    const StartDateTitle = () => {
      if (showStartDate) {
        return 'Save Start Date';
      } else {
        if (startDateHasShown.current) {
          const [
            { value: month },
            ,
            { value: day },
            ,
            { value: hour },
            ,
            { value: minute },
            ,
            { value: dayPeriod },
          ] = dateTimeFormat.formatToParts(startDate);
          return `Starts: ${month} ${day} ${hour}:${minute} ${dayPeriod}`;
        }
        return 'Start Date';
      }
    };

    const EndDateTitle = () => {
      if (showEndDate) {
        return 'Save End Date';
      } else {
        if (endDateHasShown.current) {
          const [
            { value: month },
            ,
            { value: day },
            ,
            { value: hour },
            ,
            { value: minute },
            ,
            { value: dayPeriod },
          ] = dateTimeFormat.formatToParts(endDate);
          return `Ends: ${month} ${day} ${hour}:${minute} ${dayPeriod}`;
        }
        return 'End Date';
      }
    };

    return (
      <Modalize
        ref={ref}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          bounces: false,
        }}
        modalTopOffset={110}
        onClose={onClose}
        onOpen={editMode ? getEvent : getAllHosts}
        tapGestureEnabled={false}
        rootStyle={[StyleSheet.absoluteFill, { minHeight: HEIGHT * 0.4 }]}>
        <View style={{ paddingHorizontal: 20 }}>
          <ModalHeader heading={heading} subHeading={subHeading} />
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
              placeholder={'example: Beach Day'}
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

            <Text style={styles.note}>
              Note* Please use a password-less Invite Link as only users invited
              to the event are able to join. Always check to see if your link
              works after creating the event.
            </Text>

            <Selection
              title={StartDateTitle()}
              onPress={showStartDatePicker}
              accent={true}
            />

            {showStartDate ? (
              <DatePicker
                date={startDate}
                onDateChange={setStartDate}
                minimumDate={minimumDate}
              />
            ) : (
              <View style={{ height: 10 }} />
            )}

            <Selection
              title={EndDateTitle()}
              onPress={showEndDatePicker}
              accent={true}
            />

            {showEndDate ? (
              <DatePicker
                date={endDate}
                onDateChange={setEndDate}
                minimumDate={startDate}
              />
            ) : (
              <View style={{ height: 10 }} />
            )}

            <ButtonColour
              label="Done"
              title="done"
              onPress={editMode ? onUpdate : onDone}
              loading={isUploading}
              containerStyle={styles.doneButton}
              colour={ThemeStatic.accent}
              light={true}
              disabled={!hostsData || !data}
            />
          </View>
        </View>
      </Modalize>
    );
  },
);

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
    marginHorizontal: 10,
  },
});

export default NewEventModal;
