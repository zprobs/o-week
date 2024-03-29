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
  GET_EVENT_EDIT,
  GET_GROUP_EVENTS,
  GET_GROUP_MEMBERS,
  SEND_NOTIFICATIONS,
  UPDATE_EVENT,
} from '../../graphql';
import DatePicker from 'react-native-date-picker';
import {
  AuthContext,
  getDefaultImage,
  NotificationTypes,
  processError,
  processWarning,
  saveImage,
} from '../../context';
import Fonts from '../../theme/Fonts';
import ImagePicker from 'react-native-image-crop-picker';
import { eventTypes } from '../../context';
import SegmentedControl from '@react-native-community/segmented-control';

const HEIGHT = Dimensions.get('window').height;
const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

const NewEventModal = React.forwardRef(
  /**
   *
   * @param groupId {string} the host of the event
   * @param onClose {function} a method executed onClose
   * @param groupName {string} The name of host group
   * @param editMode {boolean} if true, then editing an existing event. If false then creating a new one.
   * @param eventId {string} used to update event
   * @param isOfficial {boolean} if official will render an additional little icon
   * @param ref
   * @returns {JSX.Element}
   */
  ({ groupId, onClose, groupName, editMode, eventId, isOfficial }, ref) => {
    const [createEvent, { error: createEventError }] = useMutation(
      CREATE_EVENT,
    );
    const [updateEvent, { error: updateEventError }] = useMutation(
      UPDATE_EVENT,
    );
    const [getEvent, { data, error }] = useLazyQuery(GET_EVENT_EDIT, {
      variables: { id: eventId },
    });
    const [getAllHosts, { data: hostsData, error: hostsError }] = useLazyQuery(
      GET_ALL_GROUP_IDS,
    );

    const [
      getHostMembers,
      { data: membersData, error: membersError },
    ] = useLazyQuery(GET_GROUP_MEMBERS, { variables: { groupId: groupId } });

    const [sendNotifications] = useMutation(SEND_NOTIFICATIONS);

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
    const [linkIndex, setLinkIndex] = useState(0);
    const { authState } = useContext(AuthContext);

    const [isUploading, setIsUploading] = useState(false);

    const startDateHasShown = useRef(!!editMode);
    const endDateHasShown = useRef(!!editMode);

    if (error) {
      processWarning(error, 'Server Error');
    }

    if (createEventError) {
      processError(createEventError, 'Cannot create Event');
    }

    if (updateEventError) {
      processError(updateEventError, 'Cannot update Event');
    }

    if (hostsError) {
      processWarning(hostsError, 'Server Error');
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
        if (event.eventType === 'zoom') {
          setLinkIndex(0);
        } else if (event.eventType === 'netflix') {
          setLinkIndex(1);
        } else {
          setLinkIndex(2);
        }
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

    console.log('eventType', eventTypes[linkIndex]);

    const heading = editMode ? 'Edit Event' : 'Create Event';
    const displayName = groupName ? groupName : 'everyone';
    const subHeading = editMode
      ? 'Attendees will be notified if you change the date'
      : `Create an Event for ${displayName}`;

    const onDone = async () => {
      setIsUploading(true);
      const imageURL = imageSelection
        ? await saveImage(
            imageSelection,
            null,
            'event',
            `${name}${Date.now().toString()}`,
          )
        : image;
      const fields = {};
      fields.image = imageURL;
      fields.email = authState.user.email;
      fields.name = name;
      fields.description = description;
      fields.location = location;
      fields.website = website;
      fields.startDate = startDate;
      fields.endDate = endDate;
      fields.isOfficial = isOfficial;
      fields.eventType = eventTypes[linkIndex];
      let userIDs = [];
      const userEvent_insert_input = [];
      if (groupId) {
        fields.hosts = { data: [{ groupId: groupId }] };
        if (membersError) processError(membersError, 'Could not notify users');
        else {
          membersData.group.members.forEach((m) => {
            userIDs.push({ userId: m.userId });
            userEvent_insert_input.push({ userId: m.userId, didAccept: false });
          });
          fields.attendees = { data: userEvent_insert_input };
        }
      } else {
        if (hostsError) return;
        const IDs = [];
        hostsData.groups.forEach((group) => IDs.push({ groupId: group.id }));
        hostsData.users.forEach((user) => {
          userIDs.push({ userId: user.id });
          userEvent_insert_input.push({ userId: user.id, didAccept: false });
        });
        fields.hosts = { data: IDs };
        fields.attendees = { data: userEvent_insert_input };

      }
      const createEventData = await createEvent({
        variables: { data: fields },
        refetchQueries: groupId
          ? [{ query: GET_GROUP_EVENTS, variables: { id: groupId } }]
          : null,
      }).catch((e) => {
        console.log(e.message);
        setIsUploading(false);
      });
      setIsUploading(false);
      ref.current.close();
      if (userIDs.length > 0) {
        sendNotifications({
          variables: {
            type: NotificationTypes.newEvent,
            typeId: createEventData.data.createEvent.id,
            recipients: userIDs,
          },
        });
      }
    };

    const onUpdate = async () => {
      setIsUploading(true);
      let startChanged = false;
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
      if (startDate.getTime() !== new Date(event.startDate).getTime()) {
        fields.startDate = startDate;
        startChanged = true;
      }
      if (endDate.getTime() !== new Date(event.endDate).getTime())
        fields.endDate = endDate;
      if (eventTypes[linkIndex] !== event.eventType)
        fields.eventType = eventTypes[linkIndex];

      if (Object.keys(fields).length !== 0) {
        updateEvent({
          variables: { id: eventId, data: fields },
        })
          .then(() => {
            setIsUploading(false);
            ref.current.close();
            if (startChanged) {
              const IDs = data.event.attendees.map((a) => a.user.id);
              const recipients = [];
              IDs.forEach((id) => recipients.push({ userId: id }));
              sendNotifications({
                variables: {
                  type: NotificationTypes.eventTimeChange,
                  typeId: eventId,
                  recipients: recipients,
                },
              }).catch((e) => console.log(e));
            }
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
        cropperStatusBarColor: '#F6C60F',
        cropperToolbarColor: 'white',
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

    const onOpen = () => {
      if (editMode) {
        getEvent(); // editing an event
      } else if (groupId) {
        getHostMembers(); // creating an event for a single group
      } else {
        getAllHosts(); // creating a global event
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
        onOpen={onOpen}
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
              autoCapitalize
            />
            <FormInput
              ref={null}
              label="Description"
              placeholder="example: This event is brought to you by our sponsors"
              value={description}
              onChangeText={setDescription}
              multiline
              characterRestriction={200}
              autoCapitalize
            />

            <FormInput
              ref={null}
              label="Location"
              placeholder="example: 321 Bloor St. (optional)"
              value={location}
              onChangeText={setLocation}
              autoCapitalize
              characterRestriction={50}
            />

            <SegmentedControl
              values={['Zoom', 'Netflix Party', 'Twitch']}
              selectedIndex={linkIndex}
              onChange={(event) => {
                setLinkIndex(event.nativeEvent.selectedSegmentIndex);
              }}
              style={styles.selector}
            />

            <FormInput
              ref={null}
              label={
                linkIndex === 0
                  ? 'Zoom Link'
                  : linkIndex === 1
                  ? 'NP Link'
                  : 'Twitch Stream'
              }
              placeholder={
                linkIndex === 0
                  ? 'example: https://us02web.zoom.us/j/824?pwd=123'
                  : linkIndex === 1
                  ? 'example: https://www.netflix.com/watch/81307'
                  : 'example: https://www.twitch.tv/abc'
              }
              value={website}
              onChangeText={setWebsite}
              characterRestriction={190}
            />

            <Text style={styles.note}>
              Note* Please include the password in the Invite Link as only users on the app are able to join. Always check to see if your link
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
              label="Save"
              title="done"
              onPress={editMode ? onUpdate : onDone}
              loading={isUploading}
              containerStyle={styles.doneButton}
              colour={ThemeStatic.accent}
              light={true}
              disabled={editMode ? !data : groupId ? !membersData : !hostsData}
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
  selector: {
    marginVertical: 15,
  },
});

export default NewEventModal;
