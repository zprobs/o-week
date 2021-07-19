import React, { forwardRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GetDetailedGroup } from '@graphql/Group';
import {
  getDetailedGroup,
  getDetailedGroupVariables,
} from '@graphql/types/getDetailedGroup';
import { processWarning } from '@util/messages';
import { Dimensions, StyleSheet } from 'react-native';

const HEIGHT = Dimensions.get('window').height;

interface Props {
  groupId: string;
  isMember: boolean;
  allLeadersRef: React.Ref<any>;
}

const GroupInfoModal = forwardRef<Modalize, Props>(
  ({ groupId, isMember, allLeadersRef }, ref) => {
    const navigation = useNavigation();
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
        rootStyle={[StyleSheet.absoluteFill, { minHeight: HEIGHT * 0.4 }]}
      />
    );
  },
);

export default GroupInfoModal;
