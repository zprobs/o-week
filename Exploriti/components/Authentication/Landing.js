import React, {useState} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
                    opacity: interval === i ? 0.5 : 0.1
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
    }

    return (
        <SafeAreaView>
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
                <View style={styles.bullets}>{bullets}</View>
                <View style={styles.buttons}/>
            </View>
        </SafeAreaView>

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
        backgroundColor: '#fb2bfb',
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
        marginTop: 40,
    },
    bullets: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    bullet: {
        paddingHorizontal: 5,
        fontSize: 20,
    },
    buttons: {
        flex: 0.3,
        backgroundColor: '#f3d21d'
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
});
