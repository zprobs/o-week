import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';
import GoBackHeader from '../Menu/GoBackHeader';
import {Theme, ThemeStatic} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import CircleBackIcon from '../Menu/CircleBackIcon';
import Carousel from 'react-native-snap-carousel';


const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const Schedule = () => {

    const carouselRef = useRef();

    const renderItem = ({item, index}) => {
        return (
            <View style={styles.slide}>
                <Text style={null}>{ item.title }</Text>
            </View>
        );
    }

    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
              <CircleBackIcon/>
              <Text style={styles.title}>Schedule</Text>
              <View style={{width: 44}}/>
          </View>
          <View style={styles.date}>
              <Text style={styles.dayText}>Sunday</Text>
              <Text style={styles.dateText}>September 7th</Text>
          </View>
          <Carousel
              ref={carouselRef}
              data={DATA}
              renderItem={renderItem}
              sliderWidth={WIDTH}
              itemWidth={WIDTH*0.75}
              containerCustomStyle={styles.carousel}
          />

      </SafeAreaView>
    );
};

const DATA = [{title: "Event"}, {title: "Another"}, {title: "Last"}];

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: 'red',
   },
    title: {
       ...FontSizes.SubHeading,
        ...FontWeights.Bold,
       color: ThemeStatic.white
    },
    header: {
       flexDirection: 'row',
        marginHorizontal: 25,
        marginTop: 10,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    date: {
       marginHorizontal: 40,
        marginTop: 35
    },
    dayText: {
       ...FontWeights.Bold,
        ...FontSizes.SuperHeading,
        color: ThemeStatic.white,
        marginVertical: 7
    },
    dateText: {
       ...FontSizes.Label,
        ...FontWeights.Bold,
        color: ThemeStatic.placeholder,
        opacity: 0.8
    },
    slide: {
       backgroundColor: ThemeStatic.white,
        height: HEIGHT*0.55
    },
    carousel: {
       marginTop: 30
    }
});

export default Schedule;
