import React, { forwardRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { useQuery } from '@apollo/client';
import { GetDetailedGroup } from '@graphql/Group';
import {
  getDetailedGroup,
  getDetailedGroupVariables,
} from '@graphql/types/getDetailedGroup';
import { processWarning } from '@util/messages';
import { Dimensions, StyleSheet } from 'react-native';
import Tabs from '@views/group/groupInfoModal/Tabs';

const HEIGHT = Dimensions.get('window').height;

interface Props {
  groupId: string;
  isMember: boolean;
  allLeadersRef: React.RefObject<Modalize>;
  allMembersRef: React.RefObject<Modalize>;
}

const GroupInfoModal = forwardRef<Modalize, Props>(
  ({ groupId, isMember, allLeadersRef, allMembersRef }, ref) => {
    const { loading, data, error } = useQuery<
      getDetailedGroup,
      getDetailedGroupVariables
    >(GetDetailedGroup, {
      variables: { id: groupId, currentUser: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3' },
    });

    if (error) {
      processWarning(error, 'Server Error');
    }

    return (
      <Modalize
        ref={ref}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          bounces: false,
        }}
        alwaysOpen={HEIGHT * 0.47}
        modalTopOffset={110}
        rootStyle={[StyleSheet.absoluteFill, { minHeight: HEIGHT * 0.4 }]}>
        <Tabs
          isMember={isMember}
          groupId={groupId}
          groupLoading={loading}
          groupError={error}
          groupData={data}
          allLeadersRef={allLeadersRef}
          allMembersRef={allMembersRef}
        />
      </Modalize>
    );
  },
);

export default GroupInfoModal;
