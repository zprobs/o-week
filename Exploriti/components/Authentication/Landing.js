import React, {useState} from 'react';
import {ScrollView, Text, View, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonColour from '../ReusableComponents/ButtonColour';
import {Theme} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import images from '../../assets/images';

const {colours} = Theme.light;
const {FontWeights, FontSizes} = Fonts;

export default function Landing() {

    const [interval, setInterval] = useState(1);
    const [width, setWidth] = React.useState(0);

    const getInterval = (offset) => {
        for (let i = 1; i <= 4; i++) {
            if (offset < (width / 4) * i) {
                return i;
            }
            if (i == 4) {
                return i;
            }
        }
    };

    let bullets = [];
    for (let i = 1; i <= 4; i++) {
        bullets.push(
            <Text
                key={i}
                style={{
                    ...styles.bullet,
                    opacity: interval === i ? 0.9 : 0.15
                }}
            >
                &bull;
            </Text>
        );
    }

    const Slide = ({title, content, img}) => {

        return (
            <View style={styles.slide}>
                <Image source={img} style={styles.image}/>
                <Text style={styles.slideHeading}>
                    {title}
                </Text>
                <Text style={{ ...styles.slideText }}>
                    {content}
                </Text>
            </View>
        );
    };

    return (
        <>
            <View style={styles.container}>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{...styles.scrollView, width: `${100 * 4}%` }}
                    showsHorizontalScrollIndicator={false}
                    onContentSizeChange={(w, h) => setWidth(w)}
                    onScroll={data => {
                        setInterval(getInterval(data.nativeEvent.contentOffset.x));
                    }}
                    scrollEventThrottle={200}
                    decelerationRate="fast"
                    pagingEnabled>
                    <Slide key={1} title={"Welcome to Exploriti!"} content={"Find out what's going on around you, and make the most out of your university experience, the simple way."} img={images.landing1}/>
                    <Slide key={2} title={"Get Involved, Easily"} content={"Exploriti is your extracurricular concierge. University clubs, events, groups... Discover them all!"} img={images.landing2}/>
                    <Slide key={3} title={"Relevant Results"} content={"Exploriti uses a custom algorithm to filter results based on what we think you'll be the most interested in. Cool right?"} img={images.landing3}/>
                    <Slide key={4} title={"Get Social"} content={"See what events and clubs all of your friends are involved in. Everything is more fun with friends, even Exploriti."} img={images.landing4}/>
                </ScrollView>
            </View>

                <View style={styles.buttons}>
                    <View style={styles.bullets}>{bullets}</View>
                    <ButtonColour label={"Sign Up"} containerStyle={styles.signUp}/>
                    <ButtonColour label={"Log In"} containerStyle={styles.logIn} labelStyle={{color: colours.accent}} />
                </View>
            </>
    );
}

const styles = StyleSheet.create({
    statsHead: {
        paddingTop: 10,
        paddingHorizontal: 12,
    },
    container: {
       flex: 4,
    },
    scrollView: {
        display: 'flex',
      //  flexDirection: 'row',
        overflow: 'hidden',
     //   backgroundColor: '#f3f23f',
        alignItems: 'stretch',

    },
    bullets: {
        position: 'absolute',
        alignSelf: 'center',
        top: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 5,
        zIndex: 2
    },
    bullet: {
        paddingHorizontal: 4,
        color: colours.accent,
        fontSize: 28,
    },
    slide: {
        //backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 30,
        flexBasis: '100%',
        flex: 1,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-end',
    },
    slideText: {
        width: '100%',
        textAlign: 'center',
        ...FontSizes.Caption,
            ...FontWeights.Regular,
        color: colours.text02
    },
    slideHeading: {
        textAlign: 'center',
        ...FontSizes.SubHeading,
            ...FontWeights.Bold,
        paddingVertical: 10
    },
    buttons: {
        flex: 1,
        paddingHorizontal: 20
    },
    signUp: {
        alignItems: 'center',
        bottom: -50
    },
    logIn: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        bottom: -55
    },
    image: {
        height: 400,
        width: '100%',
      //  backgroundColor: '#a3ffff',
    }
});
