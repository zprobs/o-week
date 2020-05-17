import React from 'react';
import {View, StyleSheet, ScrollView, Text, ImageBackground, Dimensions, Image, TouchableOpacity, Platform} from 'react-native';
import images from '../../assets/images';
import Fonts from '../../theme/Fonts';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Signup() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={images.backArrow} style={styles.backArrow}/>
                </TouchableOpacity>
                <Counter/>
            </View>
            <ScrollView style={styles.scroll} horizontal={true} showsHorizontalScrollIndicator={false} >
                <ImageBackground source={images.bg1} style={styles.background}>
                    <View style={styles.form}>
                        <Text style={styles.title}>Create an Account</Text>
                    </View>
                </ImageBackground>
                <ImageBackground source={images.bg2} style={styles.background}></ImageBackground>
                <ImageBackground source={images.bg3} style={styles.background}></ImageBackground>
                <ImageBackground source={images.bg4} style={styles.background}></ImageBackground>
            </ScrollView>
        </View>
    );
}

const Counter = () => {
    return (
        <View style={styles.countCircle}>
            <Text style={styles.count}>1</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    scroll: {
        flex:1,
        backgroundColor: '#f286ef'
    },
    background: {
       width: width,
        height: height,
    },
    backArrow: {
        width: 40,
        height: 40,
        left: width*0.07,
        top: height*0.08,
    },
    header: {
        zIndex: 2,
        position: 'absolute',
        width: width,
    },
    countCircle: {
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        justifyContent: 'center',
        width: 160,
        height: 160,
        borderRadius: 80,
        top: height*0.04,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    count: {
        ...Fonts.FontWeights.Bold,
        fontSize: 110,
        color: "rgba(61,156,227,1)",
        alignSelf: 'center',

    },
    form: {
        paddingHorizontal: 20,
        top: height*0.14 + 160,
    },
    title: {
        ...Fonts.FontWeights.Bold,
        ...Fonts.FontSizes.SubHeading,
        color: '#ffffff',
        alignSelf: 'center'
    }
});
