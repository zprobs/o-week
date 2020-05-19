import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text, ImageBackground, Dimensions, Image, TouchableOpacity, Platform} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import images from '../../assets/images';
import Fonts from '../../theme/Fonts';
import {ThemeStatic} from '../../theme/Colours';
import TextLine from '../ReusableComponents/TextLine';
import ButtonColour from '../ReusableComponents/ButtonColour';
import Selection from '../ReusableComponents/Selection';

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
                    <ImageBackground source={images.bg} style={styles.background}>
                <View style={styles.page}>
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
                        <ButtonColour label={ index==0 ? "Continue as a Student (1/4)" : "Continue as an Organization (1/4)"} colour={ThemeStatic.white} labelStyle={styles.buttonLabel1} containerStyle={styles.button}/>

                    </View>
                </View>
                <View style={styles.page}>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.title}>Tell us about yourself</Text>
                            <Text style={styles.caption}>This information helps us better filter relevant content for you.</Text>
                        </View>
                        <Selection title={"Select your program"}/>
                        <Selection title={"Select your year"}/>
                        <Selection title={"Select your faculty"}/>
                        <ButtonColour label={"Continue (2/4)"} colour={ThemeStatic.white} labelStyle={styles.buttonLabel2} containerStyle={styles.button}/>
                    </View>
                </View>
                <View style={styles.page}>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.title}>Select your interests</Text>
                            <Text style={styles.caption}>This will help us get to know you outside of just your major.</Text>
                        </View>
                        <Selection title={"Select interest one"}/>
                        <Selection title={"Select interest two"}/>
                        <Selection title={"Select interest three"}/>
                        <Selection title={"Select interest four"}/>
                        <Selection title={"Select interest five"}/>
                        <ButtonColour label={"Continue (3/4)"} colour={ThemeStatic.white} labelStyle={styles.buttonLabel3} containerStyle={styles.button}/>
                    </View>
                </View>
                <View style={styles.page}>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.title}>Finish Signing Up</Text>
                            <Text style={styles.caption}>Your Exploriti account is ready to be created. Just add a profile picture and get started.</Text>
                        </View>
                        <View>
                            <Image style={styles.profilePic} source={images.logo}/>
                            <TouchableOpacity>
                                <Text style={[styles.caption,{paddingTop: 10, ...FontWeights.Bold, color: ThemeStatic.white}]}>Change Picture</Text>
                            </TouchableOpacity>
                        </View>
                        <ButtonColour label={"Create Account"} colour={ThemeStatic.white} labelStyle={styles.buttonLabel4} containerStyle={styles.button}/>
                    </View>

                </View>
            </ImageBackground>
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
        width: 4*width,
        resizeMode: 'contain',
        flexDirection: 'row',
    },
    page: {
      height: height,
      width: width
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
    buttonLabel1: {
        ...FontWeights.Regular,
        color: ThemeStatic.lightBlue,
    },
    buttonLabel2: {
        ...FontWeights.Regular,
        color: ThemeStatic.darkPurple,
    },
    buttonLabel3: {
        ...FontWeights.Regular,
        color: ThemeStatic.lightPurple,
    },
    buttonLabel4: {
        ...FontWeights.Regular,
        color: ThemeStatic.pink,
    },
    button: {
        marginBottom: 40,
    },
    caption: {
        ...FontWeights.Regular,
        ...FontSizes.Caption,
        color: ThemeStatic.lightgray,
        paddingHorizontal: 30,
        textAlign: 'center',
        marginTop: 5
    },
    profilePic: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: 'center'
    },

});
