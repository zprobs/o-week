import React, { useRef, useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import images from '../../assets/images';
import Fonts from '../../theme/Fonts';
import { ThemeStatic } from '../../theme/Colours';
import TextLine from '../ReusableComponents/TextLine';
import ButtonColour from '../ReusableComponents/ButtonColour';
import Selection from '../ReusableComponents/Selection';
import SearchableFlatList from '../Modal/SearchableFlatList';
import RadioButtonFlatList from '../Modal/RadioButtonFlatList';
import ImagePicker from 'react-native-image-crop-picker';
import '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP, GET_INTERESTS, GET_PROGRAMS } from '../../graphql';
import {
  graphqlify,
  facultiesData,
  yearsData,
  yearToInt,
  timeZoneData,
  saveImage,
  getDefaultImage,
} from '../../context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { FontWeights, FontSizes } = Fonts;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const circleSize = width * 0.38;

/**
 * The Signup component for new users. Found in the AuthStack.
 * @param navigation A navigation reference to the AuthStack navigator
 * @returns {*}
 * @constructor
 */
export default function Signup({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [programs, setPrograms] = useState([]);
  const [programsSelection, setProgramsSelection] = useState([]);
  const [year, setYear] = useState();
  const [faculty, setFaculty] = useState();
  const [timeZone, setTimezone] = useState();
  const [interests, setInterests] = useState([]);
  const [interestsSelection, setInterestsSelection] = useState([]);
  const [image, setImage] = useState(getDefaultImage());
  const [imageSelection, setImageSelection] = useState(null);
  const [page, setPage] = useState(1);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const opacity = useState(new Animated.Value(1))[0];
  const headerYOffset = useState(new Animated.Value(0))[0];

  const programRef = useRef();
  const yearRef = useRef();
  const facultyRef = useRef();
  const timeZoneRef = useRef();
  const interestRef = useRef();
  const scrollViewRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [submitUser] = useMutation(SIGN_UP);

  const onProgramRef = () => programRef.current.open();
  const onYearRef = () => yearRef.current.open();
  const onFacultyRef = () => facultyRef.current.open();
  const onTimeZoneRef = () => timeZoneRef.current.open();
  const onInterestRef = () => interestRef.current.open();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
      Keyboard.addListener('keyboardWillHide', _keyboardWillHide);
    } else {
      Keyboard.addListener('keyboardDidShow', _keyboardWillShow);
      Keyboard.addListener('keyboardDidHide', _keyboardWillHide);
    }

    // cleanup function
    return () => {
      if (Platform.OS === 'ios') {
        Keyboard.removeListener('keyboardWillShow', _keyboardWillShow);
        Keyboard.removeListener('keyboardWillHide', _keyboardWillHide);
      } else {
        Keyboard.removeListener('keyboardDidShow', _keyboardWillShow);
        Keyboard.removeListener('keyboardDidHide', _keyboardWillHide);
      }    };
  }, []);

  const _keyboardWillShow = () => {
    console.log('keyboard showing');
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(headerYOffset, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const _keyboardWillHide = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(headerYOffset, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const programTitle = () => {
    const size = programs.length;
    if (size === 0) {
      return 'Select your program';
    }
    let string = '';
    for (let i = 0; i < size; i++) {
      string = string + programs[i];
      if (i < size - 1) {
        string += ', ';
      }
    }
    return string;
  };

  const interestsTitle = (interestIndex) => {
    if (interests.length <= interestIndex) {
      switch (interestIndex) {
        case 0:
          return 'Select interest one';
        case 1:
          return 'Select interest two';
        case 2:
          return 'Select interest three';
        case 3:
          return 'Select interest four';
        default:
          return 'Select interest';
      }
    }
    return interests[interestIndex];
  };

  const flip_Animation = (forward) => {
    if (forward) {
      setAnimatedNumber(animatedNumber + 90);
    } else {
      setAnimatedNumber(animatedNumber - 180);
    }

    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 90,
        duration: 190,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 270,
        duration: 1,
        useNativeDriver: true,
        isInteraction: false,
      }),
      Animated.timing(animatedValue, {
        toValue: 360,
        duration: 190,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const setInterpolate = animatedValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const colourArray = [
    ThemeStatic.lightBlue,
    ThemeStatic.darkPurple,
    ThemeStatic.lightPurple,
    ThemeStatic.pink,
  ];

  const BottomButton = () => {
    let title;

    if (page === 1) {
      title =
        index == 0 ? 'Continue as Student (1/4)' : 'Continue as Leader (1/4)';
    } else if (page === 2) {
      title = 'Continue (2/4)';
    } else if (page === 3) {
      title = 'Continue (3/4)';
    } else {
      title = 'Create Account';
    }

    return (
      <ButtonColour
        label={title}
        colour={ThemeStatic.white}
        labelStyle={{ ...FontWeights.Regular, color: colourArray[page - 1] }}
        containerStyle={styles.button}
        onPress={nextPage}
        loading={isLoading}
        loadColour={colourArray[page - 1]}
      />
    );
  };

  function pickImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((selectedImage) => {
        setImage(selectedImage.path);
        setImageSelection(selectedImage);
      })
      .catch((result) => console.log(result));
  }

  function backButton() {
    if (page === 1) {
      Alert.alert(
        'Wait a Second',
        'If you go back, any information you may have entered will be erased. Are you sure you would like to go back?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go Back', onPress: () => navigation.navigate('Landing') },
        ],
        { cancelable: false },
      );
    } else {
      scrollViewRef.current.scrollTo({
        x: width * (page - 1) - width,
        y: 0,
        animated: true,
      });
      setPage(page - 1);
      flip_Animation(false);
    }
  }

  function nextPage() {
    if (page === 4) {
      submit();
    } else {
      setPage(page + 1);
      flip_Animation(true);
      scrollViewRef.current.scrollTo({ x: width * page, y: 0, animated: true });
    }
  }

  async function submit() {
    setIsLoading(true);
    const userData = {};

    const imageURL = imageSelection ? await saveImage(imageSelection) : image;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential.user.uid);
        userData.name = name;
        userData.email = email;
        userData.id = userCredential.user.uid;
        userData.year = yearToInt(year);
        userData.timezone =
          timeZone && timeZone.length !== 0 ? timeZone[0] : null;
        userData.programs = graphqlify(programsSelection, 'program');
        userData.interests = graphqlify(interestsSelection, 'interest');
        userData.image = imageURL;

        const orientationGroups = [
          '6fd14b29-feaf-41fe-9165-ee9fce615ec2',
          'ce945810-eb4a-47c6-83d4-5e642ac2d6c7',
        ];
        const orientationChats = [181, 182];

        userData.member = graphqlify(orientationGroups, 'group');
        userData.userChats = graphqlify(orientationChats, 'chat');

        submitUser({ variables: { data: userData } })
          .then((result) => {
            console.log(result);
          })
          .catch((reason) => console.log(reason));
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        Alert.alert(
          'Error',
          'There was an error creating your account: ' + error.toString(),
          [{ text: 'Ok' }],
          { cancelable: true },
        );
      });
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.header,
          opacity,
          transform: [{ translateY: page === 1 ? headerYOffset : 0 }],
        }}>
        <TouchableOpacity onPress={backButton} style={styles.backArrow}>
          <FeatherIcon
            name={'arrow-left'}
            size={32}
            color={ThemeStatic.white}
          />
        </TouchableOpacity>
        <View style={styles.countCircle}>
          <Animated.Text
            style={[
              styles.count,
              {
                transform: [{ rotateY: setInterpolate }, { perspective: 1000 }],
              },
              { color: colourArray[page - 1] },
            ]}>
            {page}
          </Animated.Text>
        </View>
      </Animated.View>
      <View style={styles.footer}>
        <BottomButton />
      </View>
      <ScrollView
        style={styles.scroll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEnabled={false}
        pagingEnabled={true}
        bouncesZoom={false}
        ref={scrollViewRef}>
        <Svg
          height={300}
          width={width * 4}
          style={styles.mask}
          viewBox={`0 0 ${width * 1.9} 300`}
          preserveAspectRatio="none">
          <Path
            d="M 0 175 Q 50 25 150 125 Q 250 225 300 125 Q 350 25 399 125 Q 430 190 500 125 Q 550 75 600 125 L 600 125 Q 640 171 675 125 Q 725 50 750 125 Q 771 177 800 150 L 800 0 L 0 0 L 0 175 "
            fill="white"
            stroke="white"
            fillRule="evenodd"
          />
        </Svg>

        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colourArray}
          style={styles.background}>
          <KeyboardAvoidingView style={styles.page} behavior={'position'}>
            <View style={styles.form}>
              <Animated.Text style={{ ...styles.title, opacity }}>
                Create an Account
              </Animated.Text>
              <View>
                <Text style={styles.label}>I am a...</Text>
                <SegmentedControl
                  values={['Student', 'Leader']}
                  selectedIndex={index}
                  onChange={(event) => {
                    setIndex(event.nativeEvent.selectedSegmentIndex);
                  }}
                  style={styles.selector}
                />
              </View>

              <TextLine
                style={styles.textLine}
                label={'Full Name'}
                color={ThemeStatic.white}
                icon={'user'}
                type={'name'}
                value={name}
                onChangeText={setName}
                next={true}
                onSubmit={() => emailRef.current.focus()}
              />
              <TextLine
                style={styles.textLine}
                label={'Email'}
                color={ThemeStatic.white}
                icon={'envelope'}
                placeholder={'*****@my.yorku.ca'}
                type={'emailAddress'}
                value={email}
                onChangeText={setEmail}
                ref={emailRef}
                next={true}
                onSubmit={() => passwordRef.current.focus()}
              />
              <TextLine
                style={styles.textLine}
                label={'Password'}
                color={ThemeStatic.white}
                icon={'lock'}
                placeholder={'(6+ Characters)'}
                type={'password'}
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
                <Text style={styles.caption}>
                  This information helps us better filter relevant content for
                  you.
                </Text>
              </View>
              <Selection title={programTitle()} onPress={onProgramRef} />
              <Selection
                title={year || 'Select your year'}
                onPress={onYearRef}
              />
              <Selection
                title={faculty || 'Select your college'}
                onPress={onFacultyRef}
              />
              <Selection
                title={timeZone || 'Select your time zone'}
                onPress={onTimeZoneRef}
              />
            </View>
          </View>
          <View style={styles.page}>
            <View style={styles.form}>
              <View>
                <Text style={styles.title}>Select your interests</Text>
                <Text style={styles.caption}>
                  This will help us get to know you outside of just your major.
                </Text>
              </View>
              <Selection title={interestsTitle(0)} onPress={onInterestRef} />
              <Selection title={interestsTitle(1)} onPress={onInterestRef} />
              <Selection title={interestsTitle(2)} onPress={onInterestRef} />
              <Selection title={interestsTitle(3)} onPress={onInterestRef} />
            </View>
          </View>
          <View style={styles.page}>
            <View style={styles.form}>
              <View>
                <Text style={styles.title}>Finish Signing Up</Text>
                <Text style={styles.caption}>
                  Your YorkU Hub account is ready to be created. Just add a
                  profile picture and get started.
                </Text>
              </View>
              <View>
                <Image style={styles.profilePic} source={{ uri: image }} />
                <TouchableOpacity onPress={pickImage}>
                  <Text
                    style={[
                      styles.caption,
                      {
                        paddingTop: 10,
                        ...FontWeights.Bold,
                        color: ThemeStatic.white,
                      },
                    ]}>
                    Change Picture
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
      <SearchableFlatList
        ref={programRef}
        title={'programs'}
        query={GET_PROGRAMS}
        setData={setPrograms}
        setSelection={setProgramsSelection}
        aliased={false}
        max={4}
        min={1}
        floatingButtonText={'Done'}
        offset={40}
      />
      <RadioButtonFlatList
        ref={yearRef}
        title={'year'}
        data={yearsData}
        selectedData={year}
        setData={setYear}
      />
      <RadioButtonFlatList
        ref={facultyRef}
        title={'college'}
        data={facultiesData}
        selectedData={faculty}
        setData={setFaculty}
      />
      <SearchableFlatList
        ref={interestRef}
        title={'interests'}
        query={GET_INTERESTS}
        setData={setInterests}
        setSelection={setInterestsSelection}
        aliased={true}
        max={4}
        min={1}
        floatingButtonText={'Done'}
        offset={40}
      />
      <SearchableFlatList
        ref={timeZoneRef}
        title={'time zone'}
        data={timeZoneData}
        setData={setTimezone}
        setSelection={() => {}}
        aliased={false}
        max={1}
        min={1}
        query={undefined}
        floatingButtonText={'Done'}
        offset={40}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  background: {
    width: 4 * width,
    resizeMode: 'contain',
    flexDirection: 'row',
  },
  page: {
    flex: 1,
  },
  backArrow: {
    width: 50,
    height: 50,
    left: width * 0.07,
    top: height * 0.08,
    borderRadius: 25,
    backgroundColor: ThemeStatic.delete,
    alignItems: 'center',
    justifyContent: 'center',
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
    bottom: 0,
  },
  countCircle: {
    backgroundColor: ThemeStatic.white,
    alignSelf: 'center',
    justifyContent: 'center',
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    top: height * 0.028,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    color: 'rgba(61,156,227,1)',
    alignSelf: 'center',
  },
  form: {
    paddingHorizontal: 20,
    top: height * 0.092 + circleSize,
    justifyContent: 'space-around',
    height: height - (height * 0.1 + circleSize + 80),
  },
  title: {
    ...FontWeights.Bold,
    ...FontSizes.SubHeading,
    color: ThemeStatic.white,
    alignSelf: 'center',
  },
  label: {
    ...FontWeights.Bold,
    ...FontSizes.Caption,
    color: ThemeStatic.white,
  },
  selector: {
    marginTop: 10,
  },
  textLine: {
    alignSelf: 'center',
    width: '97%',
    borderBottomColor: ThemeStatic.white,
    borderBottomWidth: 1,
  },
  button: {
    marginBottom: height * 0.03,
  },
  caption: {
    ...FontWeights.Regular,
    ...FontSizes.Caption,
    color: ThemeStatic.lightgray,
    paddingHorizontal: 30,
    textAlign: 'center',
    marginTop: 5,
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
});
