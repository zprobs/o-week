import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Theme, ThemeStatic } from '../../theme/Colours';
import FormInput from '../ReusableComponents/FormInput';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import {
  CREATE_GROUP,
  DELETE_USER_GROUPS,
  GET_DETAILED_GROUP,
  INSERT_GROUP_CHAT,
  INSERT_USER_GROUPS,
  NEW_CHAT,
  NULL,
  SEARCH_USERS,
  SEARCH_USERS_IN_GROUP,
  UPDATE_GROUP,
} from '../../graphql';
import ImagePicker from 'react-native-image-crop-picker';
import {
  AuthContext,
  getDefaultImage,
  processError,
  processWarning,
  refreshToken,
  saveImage,
} from '../../context';
import { showMessage } from 'react-native-flash-message';
import Selection from '../ReusableComponents/Selection';
import SearchableFlatList from './SearchableFlatList';
import SegmentedControl from '@react-native-community/segmented-control';
import query from 'apollo-cache-inmemory/lib/fragmentMatcherIntrospectionQuery';

const HEIGHT = Dimensions.get('window').height;
const { colours } = Theme.light;
/**
 * @param groupId {string}
 * @param onClose {function}
 * @param create {boolean}
 * @param SFLOffset {Int} offset for searchable flatlist of users. Need more when there is tab bar
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly groupId?: *, readonly onClose?: *, readonly create?: *}> & React.RefAttributes<unknown>>}
 */
const GroupEditModal = React.forwardRef(
  ({ groupId, onClose, create, SFLOffset }, ref) => {
    const [getGroup, { loading, data, error, called }] = useLazyQuery(
      create ? NULL : GET_DETAILED_GROUP,
      { variables: create ? null : { id: groupId } },
    );
    const [updateGroup, { error: updateError }] = useMutation(UPDATE_GROUP);
    const [createGroup, { error: createError }] = useMutation(CREATE_GROUP);
    const [insertUserGroups, { error: insertUserGroupsError }] = useMutation(
      INSERT_USER_GROUPS,
    );
    const [kickUsers, { error: kickUsersError }] = useMutation(
      DELETE_USER_GROUPS,
    );

    const [insertGroupChat] = useMutation(INSERT_GROUP_CHAT);
    const [newChat] = useMutation(NEW_CHAT, {});

    const [editableName, setEditableName] = useState('');
    const [editableImage, setEditableImage] = useState(getDefaultImage());
    const [newLeaders, setNewLeaders] = useState([]);
    const [newMembers, setNewMembers] = useState([]);
    const [kickedUsers, setKickedUsers] = useState([]);
    const [imageSelection, setImageSelection] = useState();
    const [editableDescription, setEditableDescription] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0); // 0 = orientation group 1 = regular group
    const { authState, setAuthState } = useContext(AuthContext);

    console.log('newLeaders', newLeaders);
    console.log('newMembers', newMembers);
    console.log('kickedUsers', kickedUsers);
    console.log('create', create);

    const addMembersRef = useRef();
    const addLeadersRef = useRef();
    const kickUserRef = useRef();

    const onAddLeaders = () => {
      setNewLeaders([]);
      addLeadersRef.current.open();
    };
    const onAddMembers = () => {
      setNewMembers([]);
      addMembersRef.current.open();
    };
    const onKickUser = () => {
      setKickedUsers([]);
      kickUserRef.current.open();
    };

    useEffect(() => {
      if (data && data.group) {
        setEditableName(data.group.name);
        setEditableDescription(data.group.description);
        setEditableImage(data.group.image);
        setNewMembers([]);
        setNewLeaders([]);
        setKickedUsers([]);
      } else if (create) {
        console.log('reset');
        setEditableName('');
        setEditableDescription('');
        setEditableImage(getDefaultImage());
        setImageSelection(null);
        setNewMembers([]);
        setNewLeaders([]);
        setKickedUsers([]);
      }
    }, [data, create]);

    const changeImage = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperStatusBarColor: '#F6C60F',
        cropperToolbarColor: 'white',
      })
        .then((selectedImage) => {
          setEditableImage(selectedImage.path);
          setImageSelection(selectedImage);
        })
        .catch((result) => console.log(result));
    };

    if (error) {
      processWarning(error, 'Server Error');
    }

    if (updateError) {
      processError(updateError, 'Cannot Update Group');
    }

    if (createError) {
      processError(createError, 'Cannot Create Group');
    }

    if (insertUserGroupsError)
      processError(insertUserGroupsError, 'Cannot Add Users to Group');
    if (kickUsersError)
      processError(kickUsersError, 'Cannot kick users from group');

    const onDone = async () => {
      setIsUploading(true);
      const fields = {};
      if (editableName !== data.group.name) fields.name = editableName;
      if (editableDescription !== data.group.description)
        fields.description = editableDescription;
      if (imageSelection) {
        fields.image = await saveImage(
          imageSelection,
          data.group.image,
          'group',
          groupId,
        );
      }
      console.log(fields);

      if (newLeaders.length > 0 || newMembers.length > 0) {
        const objects = [];
        newLeaders.forEach((l) =>
          objects.push({ groupId: groupId, userId: l, isOwner: true }),
        );
        newMembers.forEach((m) =>
          objects.push({ groupId: groupId, userId: m, isOwner: false }),
        );
        insertUserGroups({
          variables: { objects: objects },
          refetchQueries: [
            { query: GET_DETAILED_GROUP, variables: { id: groupId } },
          ],
        }).then(() => {
          setNewLeaders([]);
          setNewMembers([]);
        });
      }

      if (kickedUsers.length > 0) {
        kickUsers({
          variables: { groupId: groupId, _in: kickedUsers },
          refetchQueries: [
            { query: GET_DETAILED_GROUP, variables: { id: groupId } },
          ],
        }).then(() => setKickedUsers([]));
      }

      if (Object.keys(fields).length !== 0) {
        updateGroup({
          variables: { id: groupId, data: fields },
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

    const onCreate = async () => {
      setIsUploading(true);
      const fields = {};

      if (imageSelection) {
        fields.image = await saveImage(
          imageSelection,
          null,
          'group',
          `${editableName}${Date.now().toString()}`,
        );
      } else {
        fields.image = editableImage;
      }

      const members = [];
      const chatMembers = [];
      newLeaders.forEach((l) => {
        members.push({ userId: l, isOwner: true });
        chatMembers.push({ userId: l });
      });
      newMembers.forEach((m) => {
        members.push({ userId: m, isOwner: false });
        chatMembers.push({ userId: m });
      });

      fields.description = editableDescription;
      fields.name = editableName;
      fields.email = authState.user.email;
      fields.groupType = selectedIndex === 1 ? 'group' : 'orientation';
      fields.members = { data: members };
      fields.unsubscribable = selectedIndex === 0;

      const groupResult = await createGroup({
        variables: { object: fields },
      });
      console.log('onCompleted', groupResult);

      const chatResult = await newChat({
        variables: {
          participants: { data: chatMembers },
          image: fields.image,
          name: editableName,
        },
      });

      console.log('chatResult', chatResult)

      const { _id: chatId } = chatResult.data.createChat;

      insertGroupChat({
        variables: { groupId: groupResult.data.createGroup.id, chatId: chatId },
      });

      showMessage({
        message: 'You may have to restart the app to see the new group',
        type: 'info',
        icon: 'auto',
      });

      setIsUploading(false);
      ref.current.close();
    };

    if (loading) console.log('should not see loading group');

    let content;

    if (create || (called && data)) {
      content = (
        <View style={{ paddingHorizontal: 20 }}>
          <ModalHeader
            heading={create ? 'Create Group' : 'Edit group'}
            subHeading={
              create ? 'Create a new group' : "Edit your group's information"
            }
          />
          <View style={styles.content}>
            <ImageBackground
              source={{
                uri: editableImage,
              }}
              style={styles.image}
              imageStyle={styles.avatarImage}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={changeImage}
                style={styles.imageOverlay}>
                <Icon name="pencil" size={26} color={ThemeStatic.white} />
              </TouchableOpacity>
            </ImageBackground>

            {create ? (
              <SegmentedControl
                values={['Orientation', 'Regular']}
                selectedIndex={selectedIndex}
                onChange={(event) => {
                  setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                }}
                style={styles.selector}
              />
            ) : null}

            <FormInput
              ref={null}
              label="Name"
              value={editableName}
              onChangeText={setEditableName}
              autoCapitalize
            />
            <FormInput
              ref={null}
              label="Description"
              placeholder="example: This group is incredible"
              value={editableDescription}
              onChangeText={setEditableDescription}
              multiline
              characterRestriction={950}
              autoCapitalize
            />

            <Selection
              title={'Add Leaders'}
              onPress={onAddLeaders}
              accent={true}
            />
            <View style={{ height: 8 }} />

            <Selection
              title={'Add Members'}
              onPress={onAddMembers}
              accent={true}
            />
            <View style={{ height: 8 }} />

            {create ? null : (
              <Selection
                title={'Kick User'}
                onPress={onKickUser}
                accent={true}
              />
            )}

            <View style={{ height: 8 }} />

            <ButtonColour
              label="Save"
              title="done"
              onPress={create ? onCreate : onDone}
              loading={isUploading}
              containerStyle={styles.doneButton}
              colour={ThemeStatic.accent}
              light={true}
            />
          </View>
        </View>
      );
    }

    return (
      <>
        <Modalize
          ref={ref}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
            bounces: false,
          }}
          modalTopOffset={110}
          onClose={onClose}
          onOpen={create ? null : () => getGroup()}
          tapGestureEnabled={false}
          rootStyle={[StyleSheet.absoluteFill, { minHeight: HEIGHT * 0.4 }]}>
          {content}
        </Modalize>
        <SearchableFlatList
          query={SEARCH_USERS}
          hasImage={true}
          ref={addMembersRef}
          title={'users'}
          offset={80 + SFLOffset}
          floatingButtonOffset={SFLOffset || 0}
          setSelection={setNewMembers}
          floatingButtonText={'Add Users'}
          clearOnClose={true}
          max={900}
          min={1}
          serverSearch={true}
        />
        <SearchableFlatList
          query={SEARCH_USERS}
          hasImage={true}
          ref={addLeadersRef}
          title={'users'}
          offset={80 + SFLOffset}
          floatingButtonOffset={SFLOffset || 0}
          setSelection={setNewLeaders}
          floatingButtonText={'Add Users'}
          clearOnClose={true}
          max={900}
          min={1}
          serverSearch={true}
        />
        <SearchableFlatList
          query={SEARCH_USERS_IN_GROUP}
          variables={{ groupId: groupId }}
          hasImage={true}
          ref={kickUserRef}
          title={'users'}
          offset={80 + SFLOffset}
          floatingButtonOffset={SFLOffset || 0}
          setSelection={setKickedUsers}
          floatingButtonText={'Kick Users'}
          clearOnClose={true}
          max={900}
          min={1}
          serverSearch={true}
        />
      </>
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
  selector: {
    marginVertical: 15,
  },
});

export default GroupEditModal;
