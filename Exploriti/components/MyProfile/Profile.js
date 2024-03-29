import React, { useContext, useRef, useState } from 'react';
import { View } from 'react-native';
import { Theme } from '../../theme/Colours';
import EditProfileBottomModal from './EditProfileBottomModal';
import UsersBottomModal from '../Modal/UsersBottomModal';
import GroupBottomModal from '../Modal/GroupBottomModal';
import UserInteractions from './UserInteractions';
import ProfileCard from './ProfileCard';
import { AuthContext, processWarning } from '../../context';
import { useQuery } from '@apollo/react-hooks';
import { GET_DETAILED_USER, GET_USER_FRIENDS } from '../../graphql';
import GoBackHeader from '../Menu/GoBackHeader';
import OptionsIcon from '../Menu/OptionsIcon';
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context';
import OptionsBottomModal from '../Modal/OptionsBottomModal';
import SocialMediaAnimation from '../ReusableComponents/SocialMediaAnimation';
import NewSocialMediaLinkBottomModal from '../Modal/NewSocialMediaLinkBottomModal';
import { useNavigation } from '@react-navigation/native';
import ProfilePlaceholder from '../Placeholders/ProfilePlaceholder';

const { colours } = Theme.light;

/**
 * Profile is the screen which will display a users profile. Has two states: isCurrentUser = true or false
 * @param route The navigation route parameters set when navigating to this page using react-navigation. If it has a parameter userId then the page
 * will render with that users details. If the userId is the same as the authenticated user, then it will render the MyProfile tab with a Nav Header.
 * @returns {*}
 * @constructor
 */
export default function Profile({ route }) {
  // used to determine which social media is to be added
  const [socialIndex, setSocialIndex] = useState(0);
  const { authState } = useContext(AuthContext);
  const insets = useSafeArea();
  const editProfileBottomModalRef = useRef();
  const optionsBottomModalRef = useRef();
  const usersBottomModalRef = useRef();
  const groupBottomModalRef = useRef();
  const newSocialMediaLinkBottomModalRef = useRef();

  const isMyProfilePage = !route.params;
  const userId = isMyProfilePage ? authState.user.uid : route.params.userId;
  const isCurrentUser = !(!isMyProfilePage && userId !== authState.user.uid);

  const { loading, error, data } = useQuery(GET_DETAILED_USER, {
    variables: { id: userId, currentUser: authState.user.uid },
  });

  if (error) {
    processWarning(error, 'Could not load Profile');
    return null;
  }

  if (loading)
    return (
      <View
        style={{
          backgroundColor: colours.base,
          flex: 1,
          paddingTop: insets.top,
        }}>
        {isMyProfilePage ? null : <GoBackHeader />}
        <ProfilePlaceholder hasInteractions={!isCurrentUser} />
      </View>
    );
  const description = data.user.description;
  const name = data.user.name;
  const image =
    data.user.image === 'default_user.png'
      ? 'https://reactjs.org/logo-og.png'
      : data.user.image;
  const programs = data.user.programs
    .map((userProgram) => userProgram.program.name)
    .join(', ');
  const year = data.user.year;
  const friendCount = data.user.friends_aggregate.aggregate.count;
  const groupCount = data.user.member_aggregate.aggregate.count;

  const isBlocked = data.user.blocker.length > 0;


  const hasChat = data.user.userChats.length > 0 && data.user.userChats[0].chat.participants_aggregate.aggregate.count === 2;

  console.log({hasChat});

  const onEdit = () => editProfileBottomModalRef.current.open();
  const onOptions = () => optionsBottomModalRef.current.open();
  const onFriendsOpen = () => usersBottomModalRef.current.open();
  const onGroupsOpen = () => groupBottomModalRef.current.open();
  const onAddSocial = () => newSocialMediaLinkBottomModalRef.current.open();

  const renderInteractions = () => {
    return (
      <UserInteractions
        userId={userId}
        navigation={useNavigation()}
        image={image}
        name={name}
        onlyFriendsCanMessage={data.user.onlyFriendsCanMessage}
        isAdmin={data.user.isAdmin}
        isLeader={data.user.isLeader}
        existingChatId={hasChat ? data.user.userChats[0].chat.id : undefined}
      />
    );
  };

  const openModal = (index) => {
    setSocialIndex(index);
    onAddSocial();
  };

  return (
    <View style={{ backgroundColor: colours.base, flex: 1 }}>
      <SafeAreaView>
        {isMyProfilePage ? null : (
          <GoBackHeader
            IconRight={isCurrentUser ? null : OptionsIcon}
            IconRightOnPress={isCurrentUser ? null : onOptions}
          />
        )}
        <ProfileCard
          editable={isCurrentUser}
          description={description}
          name={name}
          programs={programs}
          image={image}
          onEdit={onEdit}
          onFriendsOpen={onFriendsOpen}
          onGroupsOpen={onGroupsOpen}
          renderInteractions={isCurrentUser ? null : renderInteractions}
          userId={userId}
          groupCount={groupCount}
          friendCount={friendCount}
          isBlocked={isBlocked}
        />
        {isCurrentUser ? <SocialMediaAnimation openModal={openModal} /> : null}
      </SafeAreaView>
      <UsersBottomModal
        ref={usersBottomModalRef}
        type="friends"
        query={GET_USER_FRIENDS}
        variables={{ userId: userId }}
        name={isCurrentUser ? null : name}
      />
      <GroupBottomModal
        ref={groupBottomModalRef}
        userId={userId}
        type="Member"
        name={isCurrentUser ? null : name}
      />
      {isCurrentUser ? (
        <>
          <EditProfileBottomModal
            ref={editProfileBottomModalRef}
            image={image}
            name={name}
            programs={data.user.programs}
            year={year}
            description={description}
          />
          <NewSocialMediaLinkBottomModal
            ref={newSocialMediaLinkBottomModalRef}
            type={socialIndex}
          />
        </>
      ) : (
        <OptionsBottomModal ref={optionsBottomModalRef} id={userId} />
      )}
    </View>
  );
}
