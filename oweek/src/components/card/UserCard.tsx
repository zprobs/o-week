import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getTheme from '@root/theme';

interface Props {
  userId?: string; // used when you want to navigate to a profile page
  groupId?: string; // used when you want to navigate to a group page
  image: string;
  name: string;
  onPress?: (id?: string) => void; // A function which will pass the userId as a parameter
  style: ViewStyle; // Additional style for the entire card
}

const UserCard: React.FC<Props> = ({
  userId,
  groupId,
  image,
  name,
  onPress,
  style,
}) => {
  const navigation = useNavigation();
  const theme = getTheme();

  const id = userId || groupId;
  const destination = userId ? 'Profile' : 'GroupScreen';
  const options = userId ? { userId } : { groupId };

  const navigateToProfile = () => {
    navigation.navigate(destination, options);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: 5,
      width: '100%',
    },
    avatarImage: {
      height: 50,
      width: 50,
      borderRadius: 50,
      backgroundColor: theme.palette.placeholder,
    },
    info: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 10,
    },
    nameText: {
      fontFamily: theme.font.regular,
      fontSize: theme.size.body,
      color: theme.palette.text01,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress ? () => onPress(id) : navigateToProfile}
      style={[styles.container, style]}>
      <Image source={{ uri: image }} style={styles.avatarImage} />
      <View style={styles.info}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
