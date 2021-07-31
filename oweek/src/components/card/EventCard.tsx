import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import getTheme from '@root/theme';
import UserCountPreview from './UserCountPreview';
import useStyles from './EventCard.styles';

interface Props {
  id: string;
  image: string;
  name: string;
  startDate: string;
  longDate: boolean; // if true then display the date as well as the time
  calendarType?: string; // To be used instead of startDate for a calendar event. Will display the text meant to show what kind of calendar it is
  userImages: Array<string>;
  count: number;
  description: string;
  style: ViewStyle;
  calendar: boolean; // if true is a calendar of events, false is an event
  plus: boolean; // true, icon = plus, false icon = check
  isSelected: boolean; // If it is a calendar, weather or not it is selected
  isExpanded: boolean; // The initial state of the card
  onPress?: (isSelected?: boolean) => void;
}

const EventCard: React.FC<Props> = ({
  id,
  image,
  name,
  startDate,
  longDate,
  calendarType,
  userImages,
  count,
  description,
  style,
  calendar,
  plus,
  isSelected,
  isExpanded,
  onPress,
}) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const theme = getTheme();

  const [expanded, setExpanded] = useState(isExpanded);
  const [selected, setSelected] = useState(isSelected);

  const icon = plus ? 'plus' : 'check';

  const time = useMemo<string>(() => {
    if (startDate) {
      const dateTimeFormat = new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dayPeriod: 'short',
      });
      const date = new Date(startDate);
      const [
        { value: month },
        ,
        { value: day },
        ,
        { value: hour },
        ,
        { value: minute },
        ,
        { value: dayPeriod },
      ] = dateTimeFormat.formatToParts(date);
      return longDate
        ? `${month} ${day}  ${hour}:${minute}${dayPeriod}`
        : `${hour}:${minute}${dayPeriod}`;
    }
    return calendarType || 'orientation';
  }, [calendarType, longDate, startDate]);

  // This part got replace by null on
  // <View
  //     style={{ flexDirection: 'row', justifyContent: 'center' }}>
  //   <ButtonColour
  //       label={'Add to phone calendar'}
  //       containerStyle={{ width: '70%' }}
  //       labelStyle={{ color: ThemeStatic.accent }}
  //       disabled={!selected}
  //       onPress={addToPhoneCalendar}
  //   />
  // </View>

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
      }}>
      <View style={{ ...styles.eventShadow, ...style }}>
        <View style={styles.event}>
          <View style={{ flex: 1 }}>
            <View style={styles.row}>
              <View style={{ flexDirection: 'row' }}>
                {calendar ? (
                  <TouchableOpacity
                    style={styles.eventImage}
                    onPress={() => {
                      if (plus) {
                        if (onPress) onPress();
                      } else {
                        if (onPress) onPress(!selected);
                        setSelected(!selected);
                      }
                    }}>
                    {selected ? (
                      <Icon name={icon} size={38} style={styles.icon} />
                    ) : null}
                  </TouchableOpacity>
                ) : (
                  <Image style={styles.eventImage} source={{ uri: image }} />
                )}
                <View style={styles.labels}>
                  <Text style={styles.eventTitle}>{name}</Text>
                  <Text style={styles.eventDate}>{time}</Text>
                </View>
              </View>
              <Icon
                name={expanded ? 'chevron-up' : 'chevron-down'}
                color={theme.palette.text02}
                size={32}
                style={{ marginRight: 5 }}
              />
            </View>
            {expanded ? (
              calendar ? null : (
                <View>
                  <Text numberOfLines={4} style={styles.eventDescription}>
                    {description}
                  </Text>
                  <View style={styles.detailsView}>
                    <UserCountPreview
                      style={{ marginLeft: 20 }}
                      count={count}
                      images={userImages}
                    />
                    <TouchableOpacity
                      style={styles.detailsButton}
                      onPress={() =>
                        navigation.navigate('EventScreen', {
                          eventId: id,
                        })
                      }>
                      <Text style={styles.detailsText}>Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            ) : null}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EventCard;
