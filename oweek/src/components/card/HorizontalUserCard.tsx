import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStyles from './HorizontalUserCard.styles';

interface Props {
  id: string;
  name: string;
  image: string;
}

const HorizontalUserCard: React.FC<Props> = ({ id, name, image }) => {
  const navigation = useNavigation();
  const styles = useStyles();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile', { userId: id })}
      style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default HorizontalUserCard;
