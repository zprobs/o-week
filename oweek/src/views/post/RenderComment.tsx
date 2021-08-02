import React, { Dispatch, SetStateAction } from 'react';
import { Modalize } from 'react-native-modalize';
import OptionsIcon from '@components/interactable/OptionsIcon';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import parseTimeElapsed from '@util/parseTimeElapsed';
import { useNavigation } from '@react-navigation/native';
import { getPostComments_post_comments } from '@graphql/types/getPostComments';
import useStyles from './Post.styles';

interface Props {
  item: getPostComments_post_comments;
  setOptionsId: (id: string) => void;
  optionsRef: React.MutableRefObject<Modalize | null>;
  setOptionsCommentId: Dispatch<SetStateAction<number | undefined>>;
  currentUser: string;
}

const RenderComment: React.FC<Props> = ({
  item,
  setOptionsId,
  optionsRef,
  setOptionsCommentId,
  currentUser,
}) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { user } = item;
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.user}
          onPress={() => navigation.navigate('Profile', { userId: user.id })}>
          <Image
            source={{
              uri: user.image,
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.time}>
              {parseTimeElapsed(item.time).readableTime}
            </Text>
          </View>
        </TouchableOpacity>
        {user.id !== currentUser ? (
          <OptionsIcon
            size={20}
            onPress={() => {
              setOptionsId(user.id);
              setOptionsCommentId(item.id);
              optionsRef.current?.open();
            }}
          />
        ) : null}
      </View>
      <Text style={styles.body}>{item.text}</Text>
    </>
  );
};

export default RenderComment;
