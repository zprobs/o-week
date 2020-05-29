import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text, ImageBackground, Dimensions, Image, TouchableOpacity, Platform, Alert, Animated, KeyboardAvoidingView, Keyboard} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import images from '../../assets/images';
import Fonts from '../../theme/Fonts';
import {Theme, ThemeStatic} from '../../theme/Colours';
import TextLine from '../ReusableComponents/TextLine';
import ButtonColour from '../ReusableComponents/ButtonColour';
import Selection from '../ReusableComponents/Selection';
import SearchableFlatList from '../Modal/SearchableFlatList';
import {Modalize} from 'react-native-modalize';
import RadioButtonFlatList from '../Modal/RadioButtonFlatList';
import User from '../../model/User';
import ImagePicker from 'react-native-image-crop-picker';
import '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

const {FontWeights, FontSizes} = Fonts;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SIGN_UP = gql`
    mutation SIGN_UP($data: user_insert_input!) {
        createUser(object: $data) {
            name
        }
    }
`;


export default function Signup({navigation}) {

    const [index, setIndex] = useState(0);
    const [user, setUser] = useState(new User());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [programs, setPrograms] = useState([]);
    const [year, setYear] = useState();
    const [faculty, setFaculty] = useState();
    const [interests, setInterests] = useState([]);
    const [image, setImage] = useState(images.logo);
    const [page, setPage] = useState(1);
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
    const [animatedNumber, setAnimatedNumber] = useState(0);
    const opacity = useState(new Animated.Value(1))[0];
    const headerYOffset = useState(new Animated.Value(0))[0];

    const programRef = useRef();
    const yearRef = useRef();
    const facultyRef = useRef();
    const interestRef = useRef();
    const scrollViewRef = useRef();
    const emailRef= useRef();
    const passwordRef = useRef();

    const [submitUser] = useMutation(SIGN_UP);

    const onProgramRef = () => programRef.current.open();
    const onYearRef = () => yearRef.current.open();
    const onFacultyRef = () => facultyRef.current.open();
    const onInterestRef = () => interestRef.current.open();

    useEffect(() => {
        Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
        Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
            Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
        };
    }, []);


    const _keyboardWillShow = () => {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(headerYOffset, {
                    toValue: -150,
                    duration: 300,
                    useNativeDriver: true
                })
            ]).start();
    };

    const _keyboardWillHide = () => {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(headerYOffset, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                })
            ]).start();
    };

    // These functions are created to pass the set state methods down to children correctly

    function handlePrograms(value) {
        setPrograms(value);
    }

    function handleInterests(value) {
        setInterests(value)
    }

    function programTitle() {
        const size = programs.length;
        if (size === 0) { return "Select your program" }
        let string = "";
        for (let i = 0; i<size; i++) {
            string = string + programs[i];
            if (i < size-1) { string += ', '}
        }
        return string
    };


    function interestsTitle(index) {
        if (interests.length <= index) {
            switch (index) {
                case 0: return "Select interest one";
                case 1: return "Select interest two";
                case 2: return "Select interest three";
                case 3: return "Select interest four";
                case 4: return "Select interest five";
                default: return "Select interest"
            }
        }
        return interests[index];
    }

    function pickImage() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImage({uri: image.path});
        });
    }

    function backButton() {

        if (page === 1) {
            Alert.alert(
                "Wait a Second",
                "If you go back, any information you may have entered will be erased. Are you sure you would like to go back?",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Go Back", onPress: () => navigation.navigate('Landing') }
                ],
                { cancelable: false }
            );

        }
        else {
            scrollViewRef.current.scrollTo({x: (width*(page-1)) - width, y: 0, animated: true});
            setPage(page-1);
            flip_Animation(false)
        }

    }

    function nextPage() {
        const pg = page;
        if (pg===4) {submit()} else {
            setPage((pg + 1));
            flip_Animation(true);
            scrollViewRef.current.scrollTo({x: width*pg, y: 0, animated: true});
        }

    }



    function submit() {

        let userData = {};

       firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential)=> {
           console.log(userCredential.user.uid);
            userData["name"] = name;
            userData["email"] = email;
            userData["id"] = userCredential.user.uid;
            switch(year) {
                case "First Year":
                    userData["year"] = 1;
                case "Second Year":
                    userData["year"] = 2;
                case "Third Year":
                    userData["year"] = 3;
                case "Fourth Year":
                    userData["year"] = 4;
                default:
                    userData["year"] = 5;
            }
            console.log(userData);

            submitUser({variables: {data : userData}}).then((result)=> console.log(result)).catch(reason => console.log(reason));



       }).catch((error)=> {
            console.log(error);
            Alert.alert(
                "Error",
                "There was an error creating your account: " + error.toString(),
                [
                    { text: "Ok" }
                ],
                { cancelable: true }
            );
        })

    }

    const flip_Animation = (forward) => {
        if (forward) {
            setAnimatedNumber(animatedNumber + 90);
        } else {
            setAnimatedNumber(animatedNumber - 180);
        }
        // Animated.spring(animatedValue, {
        //     toValue: animatedNumber,
        //     tension: 10,
        //     friction: 8,
        //     useNativeDriver: true
        // }).start(()=>{
        //     setAnimatedValue(new Animated.Value(270))
        // });

        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 90,
                duration: 190,
                useNativeDriver: true
            }),
            Animated.timing(animatedValue, {
                toValue: 270,
                duration: 1,
                useNativeDriver: true,
                isInteraction: false
            }),
            Animated.timing(animatedValue, {
                toValue: 360,
                duration: 190,
                useNativeDriver: true
            }),
        ]).start()
    };

    const setInterpolate = animatedValue.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    const BottomButton = () => {
      let title, colour;

      if (page === 1) {
        title =
          index == 0
            ? "Continue as Student (1/4)"
            : "Continue as Organization (1/4)";
        colour = ThemeStatic.lightBlue;
      } else if (page === 2) {
        title = "Continue (2/4)";
        colour = ThemeStatic.darkPurple;
      } else if (page === 3) {
        title = "Continue (3/4)";
        colour = ThemeStatic.lightPurple;
      } else {
        title = "Create Account";
        colour = ThemeStatic.pink;
      }

      return (
        <ButtonColour
          label={title}
          colour={ThemeStatic.white}
          labelStyle={{ ...FontWeights.Regular, color: colour }}
          containerStyle={styles.button}
          onPress={nextPage}
        />
      );
    };



    return (
        <View style={styles.container} >
            <Animated.View style={{...styles.header, opacity, transform: [{translateY: page===1 ? headerYOffset : 0 }]}}>
                <TouchableOpacity onPress={backButton}>
                        <Image source={images.backArrow} style={styles.backArrow}/>
                </TouchableOpacity>
                <View style={styles.countCircle}>
                    <Animated.Text style={[styles.count, {transform: [{rotateY: setInterpolate}, {perspective: 1000}]}]}>{page}</Animated.Text>
                </View>
            </Animated.View>
            <View style={styles.footer}>
                <BottomButton/>
            </View>
                <ScrollView style={styles.scroll} horizontal={true} showsHorizontalScro llIndicator={false} bounces={false} scrollEnabled={false} pagingEnabled={true} bouncesZoom={false} ref={scrollViewRef}  >
                    <ImageBackground source={images.bg} style={styles.background}>
                <KeyboardAvoidingView style={styles.page} behavior={"position"}>
                    <View style={styles.form} >
                        <Animated.Text style={{...styles.title, opacity}}>Create an Account</Animated.Text>
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
                                value={name}
                                onChangeText={setName}
                                next={true}
                                onSubmit={()=>emailRef.current.focus()}
                            />
                        <TextLine
                            style={styles.textLine}
                            label={"Email"}
                            color={ThemeStatic.white}
                            icon={"envelope"}
                            placeholder={"*****@utoronto.ca"}
                            type={"emailAddress"}
                            value={email}
                            onChangeText={setEmail}
                            ref={emailRef}
                            next={true}
                            onSubmit={()=>passwordRef.current.focus()}
                        />
                        <TextLine
                            style={styles.textLine}
                            label={"Password"}
                            color={ThemeStatic.white}
                            icon={"lock"}
                            placeholder={"(8+ Characters)"}
                            type={"password"}
                            value={password}
                            onChangeText={setPassword}
                            ref={passwordRef}
                        />

                    </View>
                </KeyboardAvoidingView>
                <View style={styles.page}>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.title}>Tell us about yourself</Text>
                            <Text style={styles.caption}>This information helps us better filter relevant content for you.</Text>
                        </View>
                        <Selection title={programTitle()} onPress={onProgramRef}/>
                        <Selection title={ year ? year : "Select your year"} onPress={onYearRef}/>
                        <Selection title={ faculty ? faculty : "Select your faculty"} onPress={onFacultyRef}/>
                    </View>
                </View>
                <View style={styles.page}>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.title}>Select your interests</Text>
                            <Text style={styles.caption}>This will help us get to know you outside of just your major.</Text>
                        </View>
                        <Selection title={interestsTitle(0)} onPress={onInterestRef}/>
                        <Selection title={interestsTitle(1)} onPress={onInterestRef}/>
                        <Selection title={interestsTitle(2)} onPress={onInterestRef}/>
                        <Selection title={interestsTitle(3)} onPress={onInterestRef}/>
                        <Selection title={interestsTitle(4)} onPress={onInterestRef}/>
                    </View>
                </View>
                <View style={styles.page}>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.title}>Finish Signing Up</Text>
                            <Text style={styles.caption}>Your Exploriti account is ready to be created. Just add a profile picture and get started.</Text>
                        </View>
                        <View>
                            <Image style={styles.profilePic} source={image}/>
                            <TouchableOpacity onPress={pickImage}>
                                <Text style={[styles.caption,{paddingTop: 10, ...FontWeights.Bold, color: ThemeStatic.white}]}>Change Picture</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ImageBackground>
            </ScrollView>
            <SearchableFlatList ref={programRef} title={'program'} data={programsData} setData={handlePrograms} max={4}/>
            <RadioButtonFlatList ref={yearRef} title={'year'} data={yearsData} selectedData={year} setData={setYear}/>
            <RadioButtonFlatList ref={facultyRef} title={'faculty'} data={facultiesData} selectedData={faculty} setData={setFaculty}/>
            <SearchableFlatList ref={interestRef} title={'interest'} data={interestsData} setData={handleInterests} max={5} />
        </View>

    );
}




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
      height: height-(100),
      width: width,
    //    backgroundColor: '#ffffff'
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
    footer: {
        zIndex: 2,
        position: 'absolute',
        width: width,
        paddingHorizontal: 20,
        bottom: 0
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
        justifyContent: 'space-around',
     //   backgroundColor: '#fa342f',
     height: height-(height*0.14 + 190 + 70)

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

const programsData = ['Math', 'Chemistry', 'English', 'Architecture', 'Marketing', 'Economics', 'Physics', 'Accounting', 'Nursing', 'Biology', 'Law', 'Medicine', 'Sociology'];
const yearsData = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Graduate School'];
const facultiesData = ['ABC', 'EFG', 'HIJ'];
const interestsData = ["Aerospace", "Anthropology", "Architecture", "Artificial Intelligence", "Biochem", "Biology", "Chemistry", "Commerce", "Computer Science", "Electrical Engineering", "Engineering", "History", "Finance", "Kinesiology", "Math", "Medical", "Neuroscience", "Nursing", "Psychology", "Robotics", "STEM", "Tutoring", "Animation", "Band", "Calligraphy", "Culinary Arts", "Dance", "Drama", "Drawing", "Film", "Guitar", "Hip Hop", "Jazz", "Literature", "Multimedia Art", "Music", "Painting", "Performing Arts", "Philosophy", "Photography", "Piano", "Poetry", "Pottery", "Radio", "Rap", "Rock", "Sculpting", "Visual Arts", "Aerobics", "Aikido", "Airsoft", "Badminton", "Baseball", "Basketball", "Biking", "Body Building", "Bowling", "Boxing", "Cricket", "CrossFit", "Curling", "Diabetes", "Diving", "Dodgeball", "Dragon Boat", "Equestrian", "Fencing", "Fitness", "Football", "Frisbee", "Go Karting", "Golf", "Gym", "Health", "Hiking", "Hockey", "Japanese Martial Arts", "Judo", "Karate", "Kendo", "Krav Maga", "Kung Fu", "Lacrosse", "MMA", "Marathon", "Martial Arts", "Motor Sports", "Muay Thai", "Nutrition", "Olympics", "Paintball", "Parkour", "Pilates", "Power Lifting", "Rallycross", "Rock Climbing", "Rowing", "Rugby", "Running", "Skating", "Skiing", "Snowboarding", "Soccer", "Sports", "Squash", "Swimming", "Sword Fighting", "Table Tennis", "Tennis", "Track and Field", "Volleyball", "Water Polo", "Weightlifting", "Wrestling", "Yoga", "Chestnut Residence", "Innis College", "New College", "St Michael's College", "Trinity College", "University College", "Victoria College", "Woodsworth College", "Charity", "Foreign Students", "Homelessness", "Mental Illness", "Social Services", "Student Support", "Volunteering", "Afghan", "African", "Albanian", "Arab", "Argentinian", "Armenian", "Asian", "Autism", "Bangladeshi", "Bollywood", "Brazilian", "Canadian", "Caribbean", "Celtic", "Chinese", "Croatian", "Indian", "Indigenous ", "Japanese", "LGBTQ", "Latin", "Macedonian", "Mental Health", "Multi Ethnic", "Palestinian", "Persian", "Slavic", "Turkish", "Women", "Clean Energy", "Climate Change", "Food", "Marine Life", "Water and Resources", "Wildlife", "Airplanes", "Anime & Manga", "Board Games", "Books", "Card Games", "Chess", "Comics", "Cooking", "Dungeons & Dragons", "Hobbies", "MOBA", "Monopoly", "Movies", "Poker", "Pokémon", "Pop Culture", "Role Playing", "Scrabble", "Sport Games", "Story Telling", "Strategy Games", "Table Top Games", "Trivia", "Video Games", "eSports", "Community", "First Responders", "Forums", "Learning", "Networking", "Outreach", "Canadian Politics", "Communism", "Conservatives", "Current Events", "Debate", "Democrats", "Economics", "Global Affairs", "Green Party", "Labour", "Law", "Liberals", "New Democratic Party", "People's Party Of Canada", "Political Science", "Socialists", "United Nations", "Alliance", "Child Advocacy", "Ethics", "Human Rights", "Immigrants", "Refugee Aid", "Sexual Advocacy", "Baha'i", "Bible Study", "Buddhism", "Catholic", "Choir", "Christianity", "Falun Dafa", "Gospel", "Hanif", "Hinduism", "Islam", "Judaism", "Meditation", "Orthodox Christianity", "Religion", "Sahaja", "Secularity", "Shia", "Sikh", "Spiritual", "Stoicism", "Sufi", "Associations", "Student Governments", "Student Unions", "Students", "Career", "Research", "Work Experience"]


