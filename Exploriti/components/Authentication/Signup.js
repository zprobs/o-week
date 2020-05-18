import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text, ImageBackground, Dimensions, Image, TouchableOpacity, Platform} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import images from '../../assets/images';
import Fonts from '../../theme/Fonts';
import {ThemeStatic} from '../../theme/Colours';
import TextLine from '../ReusableComponents/TextLine';
import ButtonColour from '../ReusableComponents/ButtonColour';

const {FontWeights, FontSizes} = Fonts;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Signup() {

    const [index, setIndex] = useState(0);


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
                        <View>
                            <Text style={styles.label}>I am a...</Text>
                            <SegmentedControl values={['Student', 'Organization']} selectedIndex={index} onChange={(event) => {setIndex(event.nativeEvent.selectedSegmentIndex)}} style={styles.selector}/>
                        </View>
                        <TextLine
                            style={styles.textLine}
                            label={"Full Name"}
                            color={ThemeStatic.white}
                            icon={"user"}
                            type={"name"}
                        />
                        <TextLine
                            style={styles.textLine}
                            label={"Email"}
                            color={ThemeStatic.white}
                            icon={"envelope"}
                            placeholder={"*****@utoronto.ca"}
                            type={"emailAddress"}
                        />
                        <TextLine
                            style={styles.textLine}
                            label={"Password"}
                            color={ThemeStatic.white}
                            icon={"lock"}
                            placeholder={"(8+ Characters)"}
                            type={"password"}
                        />
                        <ButtonColour label={ index==0 ? "Continue as a Student (1/4)" : "Continue as an Organization (1/4)"} colour={ThemeStatic.white} labelStyle={styles.buttonLabel} containerStyle={styles.button}/>

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
        backgroundColor: ThemeStatic.white,
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
        ...FontWeights.Bold,
        fontSize: 110,
        color: "rgba(61,156,227,1)",
        alignSelf: 'center',

    },
    form: {
        paddingHorizontal: 20,
        top: height*0.14 + 160,
        justifyContent: 'space-between',
    //    backgroundColor: '#fa342f',
        height: height-(height*0.14 + 190)

    },
    title: {
        ...FontWeights.Bold,
        ...FontSizes.SubHeading,
        color: ThemeStatic.white,
        alignSelf: 'center'
    },
    label: {
        ...FontWeights.Bold,
        ...FontSizes.Caption,
        color: ThemeStatic.white,
     //   marginTop: 20
    },
    selector: {
        marginTop: 10
    },
    textLine: {
        alignSelf: "center",
     //   marginTop: 20,
        width: width-40,
        borderBottomColor: ThemeStatic.white,
        borderBottomWidth: 1,
    //    paddingBottom: 5,
    },
    buttonLabel: {
        ...FontWeights.Regular,
        color: ThemeStatic.lightBlue,
    },
    button: {
        marginBottom: 40,

    }
});
