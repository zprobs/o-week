import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Theme } from "../../theme/Colours";
import ModalHeader from "../Modal/ModalHeader";
import Icon from "react-native-vector-icons/EvilIcons";
import { ThemeStatic } from "../../theme/Colours";
import FormInput from "../ReusableComponents/FormInput";
import ButtonColour from "../ReusableComponents/ButtonColour";
import Selection from '../ReusableComponents/Selection';
import { UserContext } from '../../context';
import RadioButtonFlatList from '../Modal/RadioButtonFlatList';
import {yearsData} from '../Authentication/Signup';

/**
 * Modal for editing the logged in users data
 * @param image
 * @param name
 * @param program
 * @param description
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly description?: *, readonly imageonly name?: *, readonly program?: *}> & React.RefAttributes<unknown>>}
 */
const EditProfileBottomModal = React.forwardRef(
  ({ image, name, program, description, year }, ref) => {
    const [editableImage, setEditableImage] = useState("");
    const [editableName, setEditableName] = useState("");
    const [editableYear, setEditableYear] = useState("");
    const [editableProgram, setEditableProgram] = useState("");
    const [editableDescription, setEditableDescription] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const yearRef = useRef();

    const onYearRef = () =>  yearRef.current.open();

    const {userState, userDispatch} = useContext(UserContext);

    useEffect(() => {
      setEditableImage(image);
      setEditableName(name);
      setEditableProgram(program);
      setEditableDescription(description);
      setEditableYear(year);
    }, []);


    const done = () => (
      <Icon name="check" color={ThemeStatic.white} size={20} />
    );

    const content = () => <Icon name="check" size={24} />;

    const onDone = async () => {
        const fields = {};
        if (editableName !== name) fields.name = { name: 'name', value: editableName };
        if (editableDescription !== description) fields.description = { name: 'description', value: editableDescription };
        if (editableYear !== year) fields.year = { name: 'year', value: editableYear };
        if (Object.keys(fields).length !== 0) {
            userDispatch({
                type: 'updateProfile',
                fields: fields
            });
        }
        ref.current.close();
    };

    return (
      <Modalize
        ref={ref}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        modalStyle={styles().container}
        adjustToContentHeight
        tapGestureEnabled={false}>
          <View style={{paddingHorizontal: 20}}>
        <ModalHeader
          heading="Edit profile"
          subHeading="Edit your personal information"
        />
        <View style={styles().content}>
          <ImageBackground
            source={{
              uri: editableImage
                ? editableImage
                : "https://reactjs.org/logo-og.png",
            }}
            style={styles().image}
            imageStyle={styles().avatarImage}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                console.log("change image");
              }}
              style={styles().imageOverlay}>
              <Icon name="pencil" size={26} color={ThemeStatic.white} />
            </TouchableOpacity>
          </ImageBackground>

          <FormInput
            ref={null}
            label="Name"
            value={editableName}
            onChangeText={setEditableName}
          />
            <FormInput
                ref={null}
                label="Description"
                placeholder="example: hey, I am a doggo"
                value={editableDescription}
                onChangeText={setEditableDescription}
                multiline
                characterRestriction={200}
            />
            <View style={{height: 4}}/>
            <Selection title={"Change Program"} onPress={()=>console.log('pressed')} accent={true} style={styles.selections}/>
                <View style={{height: 8}}/>
                <Selection title={"Change Year"} onPress={onYearRef} accent={true} style={styles.selections}/>
            <View style={{height: 8}}/>
            <Selection title={"Change Interests"} onPress={()=>console.log('pressed')} accent={true} style={styles.selections}/>


            <ButtonColour
            Icon={done}
            label="Done"
            title="done"
            onPress={onDone}
            loading={isUploading}
            containerStyle={styles().doneButton}
            colour={ThemeStatic.accent}
            light={true}
          />
        </View>
          </View>
          <RadioButtonFlatList ref={yearRef} title={'year'} data={yearsData} selectedData={editableYear} setData={setEditableYear}/>
      </Modalize>
  );
  },
);

const { colours } = Theme.light;

const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: colours.base,
    },
    content: {
      flex: 1,
    },
    image: {
      alignSelf: "center",
      height: 100,
      width: 100,
      marginTop: 20,
    },
    avatarImage: {
      backgroundColor: colours.placeholder,
      borderRadius: 100,
    },
    imageOverlay: {
      position: "absolute",
      height: 100,
      width: 100,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      backgroundColor: colours.accent,
      opacity: 0.8,
    },
    doneButton: {
      marginVertical: 20,
    },

  });

export default EditProfileBottomModal;
