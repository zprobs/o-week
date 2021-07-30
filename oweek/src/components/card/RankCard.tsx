import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import useStyles from './RankCard.styles';

interface Props {
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
  rank: string; // ex: "1st" or "3rd"
  gold: boolean;
  points?: number;
  team: string;
}

const RankCard: React.FC<Props> = ({
  style,
  onPress,
  rank,
  gold,
  points,
  team,
}) => {
  const styles = useStyles(gold);
  const Content = () => (
    <>
      <View style={styles.ring} />
      <View style={[styles.row]}>
        <Text style={styles.place}>{rank}</Text>
        <View style={styles.rank}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.label}>Team</Text>
            <Text style={styles.text}>{team}</Text>
          </View>
          <View style={{ height: 10 }} />
          <View>
            <Text style={styles.label}>Points</Text>
            <Text style={styles.text}>
              {points ? points.toLocaleString() : 0}
            </Text>
          </View>
        </View>
      </View>
      {onPress ? (
        <View style={styles.moreInfo}>
          <Text style={styles.moreInfoText}>MORE INFO</Text>
          <Icon name="chevron-right" color={gold ? '#FFF' : '#000'} size={16} />
        </View>
      ) : null}
    </>
  );

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {gold ? (
        <LinearGradient
          colors={['rgb(247, 190, 100)', 'rgb(244, 166, 4)']}
          style={styles.container}>
          <Content />
        </LinearGradient>
      ) : (
        <View style={{ ...styles.container, backgroundColor: 'white' }}>
          <Content />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RankCard;
