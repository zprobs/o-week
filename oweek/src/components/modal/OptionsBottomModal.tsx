import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/Feather';
import { useLazyQuery, useMutation } from '@apollo/client';
import { processError, processWarning } from '@util/messages';
import { showMessage } from 'react-native-flash-message';
import {
  BlockUser,
  CheckUserBlocked,
  ReportUser,
  UnblockUser,
} from '@graphql/User';
import { reportUser, reportUserVariables } from '@graphql/types/reportUser';
import { blockUser, blockUserVariables } from '@graphql/types/blockUser';
import { unBlockUser, unBlockUserVariables } from '@graphql/types/unBlockUser';
import {
  checkUserBlocked,
  checkUserBlockedVariables,
} from '@graphql/types/checkUserBlocked';
import ModalHeader from './ModalHeader';
import useStyles from './OptionsBottomModal.styles';

interface OptionsProps {
  label: string;
  iconName: string;
  onPress: () => void;
  children?: React.ReactNode;
  color?: string;
}

const Option: React.FC<OptionsProps> = ({
  label,
  iconName,
  onPress,
  children,
  color,
}) => {
  const styles = useStyles();
  if (children)
    return (
      <View style={styles.optionContainer}>
        <Icon
          name={iconName}
          size={20}
          color={color || styles.iconColor.color}
        />
        {children}
      </View>
    );

  return (
    <TouchableOpacity
      style={styles.optionContainer}
      activeOpacity={0.9}
      onPress={onPress}>
      <Icon name={iconName} size={20} color={color || styles.iconColor.color} />
      <Text style={[styles.label, { color: color || styles.iconColor.color }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface ModalProps {
  id: string; // the id of user who can be reported or blocked
  commentId?: number; // optional if reporting a comment
  postId?: number; // optional if reporting a post
}

/**
 * Modal for displaying extra options. Currently setup for user options
 */
const OptionsBottomModal = React.forwardRef<Modalize, ModalProps>(
  ({ id, commentId, postId }, ref) => {
    const styles = useStyles();
    const [reportUserMutation, { error: reportError }] = useMutation<
      reportUser,
      reportUserVariables
    >(ReportUser, {
      variables: {
        reported: id,
        reporter: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3',
        commentId,
        postId,
      },
      onCompleted: () => {
        showMessage({
          message: 'Report Submitted',
          description:
            'Thank you for letting us know. We will examine this user as soon as possible',
          autoHide: true,
          duration: 4000,
          type: 'success',
          icon: 'auto',
        });
      },
    });

    if (reportError) processError(reportError, 'Report cannot be submitted');

    const variables = {
      blockerId: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3',
      blockedId: id,
    };
    const options = {
      variables,
      refetchQueries: [{ query: CheckUserBlocked, variables }],
    };

    const [block, { error: blockError }] = useMutation<
      blockUser,
      blockUserVariables
    >(BlockUser, options);
    const [unBlock, { error: unBlockError }] = useMutation<
      unBlockUser,
      unBlockUserVariables
    >(UnblockUser, options);
    const [checkBlocked, { data, error }] = useLazyQuery<
      checkUserBlocked,
      checkUserBlockedVariables
    >(CheckUserBlocked, {
      variables,
      fetchPolicy: 'cache-and-network',
    });

    if (error) processWarning(error, 'Server Error');
    if (unBlockError) processError(unBlockError, 'Could not unblock user');
    if (blockError) processError(blockError, 'Could not block user');

    const isBlocked = data && data.block.length > 0;

    return (
      <Modalize
        ref={ref}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        modalStyle={styles.container}
        onOpen={checkBlocked}
        adjustToContentHeight>
        <ModalHeader heading="Options" subHeading="Tell us what you think" />
        <View style={styles.content}>
          {isBlocked ? (
            <Option
              label="Un Block"
              iconName="plus-circle"
              color={styles.unBlockColor.color}
              onPress={unBlock}
            />
          ) : (
            <Option
              label="Block"
              iconName="x-circle"
              color={styles.blockColor.color}
              onPress={block}
            />
          )}

          <View style={{ height: 20 }} />

          <Option
            label="Report"
            iconName="flag"
            color={styles.blockColor.color}
            onPress={reportUserMutation}
          />
        </View>
      </Modalize>
    );
  },
);

export default OptionsBottomModal;
