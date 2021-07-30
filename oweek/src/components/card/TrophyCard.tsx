import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Trophy from '../../assets/svg/trophy.svg';
import useStyles from './TrophyCard.styles';

interface Props {
  name: string;
}

const TrophyCard: React.FC<Props> = ({ name }) => {
  const styles = useStyles();
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.shadow}>
        <LinearGradient
          colors={['rgba(247,190,98,1)', 'rgba(244,167,6,1)']}
          style={styles.image}>
          <Trophy width={60} height={60} fill="white" />
        </LinearGradient>
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default TrophyCard;
