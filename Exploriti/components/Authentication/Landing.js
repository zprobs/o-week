import React, {useState} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonColour from '../ReusableComponents/ButtonColour';
import {Theme} from '../../theme/Colours';

const {colours} = Theme.light;
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
                    opacity: interval === i ? 0.9 : 0.1
                }}
            >
                &bull;
            </Text>
        );
    }

    const Slide = ({title}) => {

        return (
            <View style={styles.slide}>
                <Text style={{ ...styles.slideText }}>
                    {title}
                </Text>
            </View>
        );
    };

    return (
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
                    <Slide key={1} title={"Item 1"}/>
                    <Slide key={2} title={"Item 2"}/>
                    <Slide key={3} title={"Item 3"}/>
                    <Slide key={4} title={"Item 4"}/>
                </ScrollView>

                <View style={styles.buttons}>
                    <View style={styles.bullets}>{bullets}</View>
                    <ButtonColour label={"Sign Up"} containerStyle={styles.signUp}/>
                    <ButtonColour label={"Log In"} containerStyle={styles.logIn} labelStyle={{color: colours.accent}} />
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    statsHead: {
        paddingTop: 10,
        paddingHorizontal: 12,
    },
    container: {
        width: '100%',
        height: '100%',
        borderColor: '#ebebeb',
        borderWidth: 1,
        borderRadius: 8,
        shadowColor: '#fcfcfc',
        shadowOpacity: 1,
        marginTop: 10,
        shadowOffset: {
            width: 0,
            height: 5
        },
    },
    scrollView: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        backgroundColor: '#f3f23f',
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
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 30,
        flexBasis: '100%',
        flex: 1,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: 200,
    },
    slideText: {
        width: '100%',
        textAlign: 'left',
        fontSize: 20,
    },
    buttons: {
        flex: 0.4,
        paddingHorizontal: 20
    },
    signUp: {
        alignItems: 'center',
        bottom: -50
    },
    logIn: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        bottom: -55
    }
});
