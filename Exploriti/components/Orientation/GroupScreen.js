import React, { useContext, useRef } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import CircleBackIcon from '../Menu/CircleBackIcon';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import GroupInfoModal from '../Modal/GroupInfoModal';
import LinearGradient from 'react-native-linear-gradient';
import CircleEditIcon from '../ReusableComponents/CircleEditIcon';
import GroupEditModal from '../Modal/GroupEditModal';
import { useQuery } from '@apollo/react-hooks';
import {
  CHECK_USER_ADMIN,
  GET_GROUP_IMAGE_NAME,
  GET_GROUP_MEMBERS_PAGINATED,
  GET_USER_GROUPS,
} from '../../graphql';
import NewEventModal from '../Modal/NewEventModal';
import { AuthContext, processWarning } from '../../context';
import UsersBottomModal from '../Modal/UsersBottomModal';
import { ImageBackgroundPlaceholder } from '../Placeholders/ImageBackgroundPlaceholder';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;
const HEIGHT = Dimensions.get('window').height;

/**
 *
 * @param route The navigation route params, should contain the groupId
 * @returns {*}
 * @constructor
 */
const GroupScreen = ({ route }) => {
  const modalRef = useRef();
  const editRef = useRef();
  const allLeadersRef = useRef();
  const allMembersRef = useRef();
  const creatEventRef = useRef();
  const { groupId } = route.params;
  const { authState } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_GROUP_IMAGE_NAME, {
    variables: { id: groupId },
  });
  const { data: isOwnerData } = useQuery(GET_USER_GROUPS, {
    variables: { id: authState.user.uid },
    fetchPolicy: 'cache-only',
  });

  const { data: isAdminData } = useQuery(CHECK_USER_ADMIN, {
    variables: { id: authState.user.uid },
    fetchPolicy: 'cache-only',
  });

  if (loading) {
    return <ImageBackgroundPlaceholder />;
  }

  if (error) {
    processWarning(error, 'Server Error');
    return null;
  }

  const filteredMemberships = isOwnerData
    ? isOwnerData.user.member.filter(
        (membership) => membership.group.id === groupId,
      )
    : [];

  const isMember = filteredMemberships.length > 0;
  const isOwner = isMember && filteredMemberships[0].isOwner === true;

  const { group } = data;

  const edit = () => {
    modalRef.current.close();
    editRef.current.open();
  };

  const createEvent = () => {
    modalRef.current.close();
    creatEventRef.current.open();
  };

  const onCloseEdit = () => {
    modalRef.current.open();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: group.image }}
        style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={styles.icons}>
            <CircleBackIcon style={styles.circleBackIcon} />
            {isAdminData.user.isAdmin || isOwner ? (
              <View>
                <CircleEditIcon style={styles.circleEditIcon} onPress={edit} />
                <CircleEditIcon
                  style={styles.circleEditIcon}
                  onPress={createEvent}
                  icon={'calendar'}
                />
              </View>
            ) : null}
          </View>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            style={styles.titleContainer}>
            <Text style={styles.title}>{group.name}</Text>
          </LinearGradient>
        </View>
      </ImageBackground>
      <GroupInfoModal
        ref={modalRef}
        groupId={group.id}
        isMember={isMember}
        allLeadersRef={allLeadersRef}
        allMembersRef={allMembersRef}
      />
      <UsersBottomModal
        query={GET_GROUP_MEMBERS_PAGINATED}
        variables={{ groupId: groupId, isOwner: true }}
        type={'group'}
        ref={allLeadersRef}
      />
      <UsersBottomModal
        query={GET_GROUP_MEMBERS_PAGINATED}
        _
        variables={{ groupId: groupId, isOwner: false }}
        type={'group'}
        ref={allMembersRef}
      />
      {isAdminData.user.isAdmin || isOwner ? (
        <>
          <GroupEditModal
            ref={editRef}
            groupId={group.id}
            onClose={onCloseEdit}
            SFLOffset={100}
          />
          <NewEventModal
            ref={creatEventRef}
            groupId={group.id}
            onClose={onCloseEdit}
            groupName={group.name}
            isOfficial={group.groupType === 'admin'}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
  },
  backgroundImage: {
    width: '100%',
    height: HEIGHT * 0.44,
  },
  header: {
    justifyContent: 'flex-end',
    height: HEIGHT * 0.44,
    alignItems: 'flex-start',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },
  circleBackIcon: {
    marginTop: 45,
    marginLeft: 20,
  },
  circleEditIcon: {
    marginTop: 45,
    marginRight: 20,
  },
  titleContainer: {
    paddingBottom: 48,
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '100%',
    flexDirection: 'row',
  },
  title: {
    ...FontWeights.Bold,
    ...FontSizes.Heading,
    color: colours.white,
  },
});

export default GroupScreen;
