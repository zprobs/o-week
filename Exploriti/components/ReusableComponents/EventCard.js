import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
    Image,
    LayoutAnimation,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import UserCountPreview from './UserCountPreview';
import Icon from 'react-native-vector-icons/Feather';
import Fonts from '../../theme/Fonts';
import {Theme, ThemeStatic} from '../../theme/Colours';
import ButtonColour from './ButtonColour';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;
const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 0.75 * WIDTH;

/**
 * Event card, to be displayed in the schedule carousel
 * @param id {string} eventId
 * @param image {string}
 * @param name {string}
 * @param startDate {string}
 * @param longDate {boolean} if true then display the date aswell as the time
 * @param calendarType {string} To be used instead of startDate for a calendar event. Will display the text meant to show what kind of calendar it is
 * @param userImages {[string]}
 * @param count {int}
 * @param description
 * @param style
 * @param calendar {boolean} if true is a calendar of events, false is an event
 * @param plus {boolean} true, icon = plus, false icon = check
 * @param isSelected {boolean} If it is a calendar, weather or not it is selected
 * @param isExpanded {boolean} The initial state of the card
 * @param remove {function} a function for deleting this item using its key
 * @param onPress {function} a function for calendars when the icon is pressed
 * @returns {*}
 * @constructor
 */
export const EventCard = ({ id, image, name, startDate, longDate, calendarType, userImages, count, description, style, calendar ,plus, isSelected, isExpanded, remove, onPress }) => {
    const navigation = useNavigation();

    const [expanded, setExpanded] = useState(isExpanded);
    const [selected, setSelected] = useState(isSelected);

    const icon = plus ? 'plus' : 'check';


    let time;
    if (startDate) {
        const dateTimeFormat = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, dayPeriod: 'short' })
        const date = new Date(startDate);
        const [ { value: month },,{ value: day },,{value: hour},,{value: minute},,{value: dayPeriod}] = dateTimeFormat .formatToParts(date )
        time = longDate ? `${month} ${day}  ${hour}:${minute}${dayPeriod}` : `${hour}:${minute}${dayPeriod}`;
    } else {
        time = calendarType;
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setExpanded(!expanded);
        }}>
        <View style={{ ...styles.eventShadow, ...style }}>
          <View style={{ ...styles.event, width: '100%' }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  {calendar ? (
                    <TouchableOpacity
                      style={[
                        styles.eventImage,
                        {
                          backgroundColor: colours.placeholder,
                          justifyContent: 'center',
                        },
                      ]}
                    onPress={()=>{
                        if (plus) {
                            onPress && onPress();
                        } else {
                            onPress && onPress(!selected);
                            setSelected(!selected);
                        }
                    }}
                    >
                      {selected ? (
                        <Icon
                          name={icon}
                          size={38}
                          style={{ alignSelf: 'center' }}
                        />
                      ) : null}
                    </TouchableOpacity>
                  ) : (
                    <Image style={styles.eventImage} source={{ uri: image }} />
                  )}
                  <View style={{ justifyContent: 'center', paddingBottom: 5 }}>
                    <Text style={styles.eventTitle}>{name}</Text>
                    <Text style={styles.eventDate}>{time}</Text>
                  </View>
                </View>
                <Icon
                  name={expanded ? 'chevron-up' : 'chevron-down'}
                  color={colours.text02}
                  size={32}
                  style={{ marginRight: 5 }}
                />
              </View>
              {expanded ? (
                calendar ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <ButtonColour
                      label={'Add to phone calendar'}
                      containerStyle={{ width: '70%' }}
                      labelStyle={{ color: ThemeStatic.accent }}
                      onPress={remove}
                    />

                  </View>
                ) : (
                  <View>
                    <Text numberOfLines={4} style={styles.eventDescription}>{description}</Text>
                    <View style={styles.detailsView}>
                      <UserCountPreview style={{ marginLeft: 20 }} count={count} images={userImages} />
                      <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() =>
                          navigation.push('EventScreen', {
                             eventId: id
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

const styles = StyleSheet.create({
    event: {
        backgroundColor: colours.base,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
        maxWidth: ITEM_WIDTH,
        paddingVertical: 5,
        overflow: 'hidden'
    },
    eventShadow: {
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
    },
    eventImage: {
        height: 54,
        width: 54,
        borderRadius: 27,
        marginVertical: 15,
        marginHorizontal: 12,
    },
    eventTitle: {
        ...FontWeights.Bold,
        ...FontSizes.Label,
        maxWidth: WIDTH * 0.4,
        marginVertical: 8,
    },
    eventDate: {
        ...FontSizes.Caption,
        ...FontWeights.Bold,
        color: colours.text03,
    },
    eventDescription: {
        maxWidth: ITEM_WIDTH * 0.7,
        padding: 15,
        ...FontWeights.Bold,
        ...FontSizes.Caption,
        color: colours.text03,
    },
    detailsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 12,
        paddingHorizontal: 20
    },
    detailsButton: {
        height: 30,
        borderRadius: 15,
        shadowRadius: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 1.5,
            height: 1.5,
        },
        shadowOpacity: 0.6,
        paddingHorizontal: 10,
        backgroundColor: colours.base,
        justifyContent: 'center',
    },
    detailsText: {
        ...FontSizes.SubText,
        ...FontWeights.Bold,
        color: colours.text03,
    },
});

export default EventCard
