import React, { useMemo, useRef } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import CircleBackIcon from '@components/navigation/CircleBackIcon';
import LinearGradient from 'react-native-linear-gradient';
import CircleEditIcon from '@components/interactable/CircleEditIcon';
import { useQuery } from '@apollo/client';
import { CheckUserAdmin, GetUserGroups } from '@graphql/User';
import { GetGroupMembersPaginated, GetGroupImageName } from '@graphql/Group';
import { processWarning } from '@util/messages';
import ImageBackgroundPlaceholder from '@components/placeholders/ImageBackgroundPlaceholder';
import { RouteProp } from '@react-navigation/native';
import { OrientationStackParamList } from '@views/orientation/OrientationStackParamList';
import {
  getGroupImageName,
  getGroupImageNameVariables,
} from '@graphql/types/getGroupImageName';
import {
  getUserGroups,
  getUserGroups_user_member,
  getUserGroupsVariables,
} from '@graphql/types/getUserGroups';
import {
  checkUserAdmin,
  checkUserAdminVariables,
} from '@graphql/types/checkUserAdmin';
import { Modalize } from 'react-native-modalize';
import UsersBottomModal from '@components/modal/UsersBottomModal';
import NewEventModal from '../Modal/NewEventModal';
import GroupEditModal from '../Modal/GroupEditModal';
import GroupInfoModal from './groupInfoModal';
import useStyles from './GroupScreen.styles';

type Props = {
  route: RouteProp<OrientationStackParamList, 'GroupScreen'>;
};

const GroupScreen: React.FC<Props> = ({ route }) => {
  const styles = useStyles();
  const modalRef = useRef<Modalize>(null);
  const editRef = useRef<Modalize>(null);
  const allLeadersRef = useRef<Modalize>(null);
  const allMembersRef = useRef<Modalize>(null);
  const creatEventRef = useRef<Modalize>(null);
  const { groupId } = route.params;

  const { data, loading, error } = useQuery<
    getGroupImageName,
    getGroupImageNameVariables
  >(GetGroupImageName, {
    variables: { id: groupId },
  });
  const { data: isOwnerData } = useQuery<getUserGroups, getUserGroupsVariables>(
    GetUserGroups,
    {
      variables: { id: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3' },
      fetchPolicy: 'cache-only',
    },
  );

  const { data: isAdminData } = useQuery<
    checkUserAdmin,
    checkUserAdminVariables
  >(CheckUserAdmin, {
    variables: { id: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3' },
    fetchPolicy: 'cache-only',
  });

  const filteredMemberships = useMemo<getUserGroups_user_member[]>(() => {
    if (isOwnerData) {
      return (
        isOwnerData.user?.member.filter(
          (membership) => membership.group.id === groupId,
        ) || []
      );
    }
    return [];
  }, [groupId, isOwnerData]);

  if (loading) {
    return <ImageBackgroundPlaceholder />;
  }

  if (error) {
    processWarning(error, 'Server Error');
    return null;
  }

  if (!data) return null;

  const isMember = filteredMemberships.length > 0;
  const isOwner = isMember && filteredMemberships[0].isOwner;

  const { group } = data;

  const edit = () => {
    modalRef.current?.close();
    editRef.current?.open();
  };

  const createEvent = () => {
    modalRef.current?.close();
    creatEventRef.current?.open();
  };

  const onCloseEdit = () => {
    modalRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: group?.image }}
        style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={styles.icons}>
            <CircleBackIcon style={styles.circleBackIcon} />
            {isAdminData?.user?.isAdmin || isOwner ? (
              <View>
                <CircleEditIcon style={styles.circleEditIcon} onPress={edit} />
                <CircleEditIcon
                  style={styles.circleEditIcon}
                  onPress={createEvent}
                  icon="calendar"
                />
              </View>
            ) : null}
          </View>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            style={styles.titleContainer}>
            <Text style={styles.title}>{group?.name}</Text>
          </LinearGradient>
        </View>
      </ImageBackground>
      <GroupInfoModal
        ref={modalRef}
        groupId={group?.id}
        isMember={isMember}
        allLeadersRef={allLeadersRef}
        allMembersRef={allMembersRef}
      />
      <UsersBottomModal
        query={GetGroupMembersPaginated}
        variables={{ groupId, isOwner: true }}
        type="group"
        ref={allLeadersRef}
      />
      <UsersBottomModal
        query={GetGroupMembersPaginated}
        _
        variables={{ groupId, isOwner: false }}
        type="group"
        ref={allMembersRef}
      />
      {isAdminData?.user?.isAdmin || isOwner ? (
        <>
          <GroupEditModal
            ref={editRef}
            groupId={group?.id}
            onClose={onCloseEdit}
            SFLOffset={100}
          />
          <NewEventModal
            ref={creatEventRef}
            groupId={group?.id}
            onClose={onCloseEdit}
            groupName={group?.name}
            isOfficial={group?.groupType === 'admin'}
          />
        </>
      ) : null}
    </View>
  );
};

export default GroupScreen;
