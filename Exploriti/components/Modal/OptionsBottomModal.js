import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Icon from 'react-native-vector-icons/Feather';
import ModalHeader from './ModalHeader';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import {
  BLOCK_USER,
  CHECK_USER_BLOCKED,
  REPORT_USER,
  UNBLOCK_USER,
} from '../../graphql';
import { AuthContext, processError, processWarning } from '../../context';
import { showMessage } from 'react-native-flash-message';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * Modal for displaying extra options. Currently setup for user options
 * @param id {string} the id of user who can be reported or blocked
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly selectedData?: *, readonly setData?: *, readonly title?: *, readonly data?: *}> & React.RefAttributes<unknown>>}
 */
const OptionsBottomModal = React.forwardRef(({ id, commentId, postId }, ref) => {
  console.log('optionsID', id);

  const { authState } = useContext(AuthContext);
  const [reportUser, { error: reportError }] = useMutation(REPORT_USER, {
    variables: { reported: id, reporter: authState.user.uid, commentId: commentId, postId: postId },
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

  const variables = { blockerId: authState.user.uid, blockedId: id };
  const options = {
    variables: variables,
    refetchQueries: [{ query: CHECK_USER_BLOCKED, variables: variables }],
  };

  const [block, { error: blockError }] = useMutation(BLOCK_USER, options);
  const [unBlock, { error: unBlockError }] = useMutation(UNBLOCK_USER, options);
  const [
    checkBlocked,
    { data, loading, error },
  ] = useLazyQuery(CHECK_USER_BLOCKED, {
    variables: variables,
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
            color={ThemeStatic.black}
            onPress={unBlock}
          />
        ) : (
          <Option
            label="Block"
            iconName="x-circle"
            color={ThemeStatic.delete}
            onPress={block}
          />
        )}

        <View style={{height: 20}}/>

        <Option
          label="Report"
          iconName="flag"
          color={ThemeStatic.delete}
          onPress={reportUser}
        />
      </View>
    </Modalize>
  );
});

const Option = ({ label, iconName, onPress, children, color }) => {
  if (children)
    return (
      <View style={styles.optionContainer}>
        <Icon name={iconName} size={20} color={color || colours.text01} />
        {children}
      </View>
    );

  return (
    <TouchableOpacity
      style={styles.optionContainer}
      activeOpacity={0.9}
      onPress={onPress}>
      <Icon name={iconName} size={20} color={color || colours.text01} />
      <Text style={[styles.label, { color: color || colours.text01 }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colours.base,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    marginLeft: 10,
  },
});

export default OptionsBottomModal;
