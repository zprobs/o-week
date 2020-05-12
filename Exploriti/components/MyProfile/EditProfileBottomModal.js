import React, { useState } from "react";
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
import Button from "../ReusableComponents/Button";

/**
 * Modal for editing the logged in users data
 * @param avatar
 * @param name
 * @param handle
 * @param about
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly about?: *, readonly avatar?: *, readonly name?: *, readonly handle?: *}> & React.RefAttributes<unknown>>}
 */
const EditProfileBottomModal = React.forwardRef(
  ({ avatar, name, handle, about }, ref) => {
    const [editableAvatar, setEditableAvatar] = useState("");
    const [editableName, setEditableName] = useState("");
    const [editableHandle, setEditableHandle] = useState("");
    const [handleError, setHandleError] = useState("");
    const [editableAbout, setEditableAbout] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const setHandle = (handle: string) => {
      if (!handle) setHandleError("username cannot be empty");
      setEditableHandle(handle);
    };

    const done = () => (
      <Icon name="check" color={ThemeStatic.white} size={20} />
    );

    const content = () => <Icon name="check" size={24} />;

    const onDone = async () => {
      ref.current.close();
    };

    return (
      <Modalize
        ref={ref}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        modalStyle={styles().container}
        adjustToContentHeight>
        <ModalHeader
          heading="Edit profile"
          subHeading="Edit your personal information"
        />
        <View style={styles().content}>
          <ImageBackground
            source={{
              uri: editableAvatar
                ? editableAvatar
                : "https://reactjs.org/logo-og.png",
            }}
            style={styles().avatar}
            imageStyle={styles().avatarImage}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                console.log("change avatar");
              }}
              style={styles().avatarOverlay}>
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
            label="Program"
            placeholder="example: Math"
            error={handleError}
            value={editableHandle}
            onChangeText={setHandle}>
            {content}
          </FormInput>
          <FormInput
            ref={null}
            label="Description"
            placeholder="example: hey, I am a doggo"
            value={editableAbout}
            onChangeText={setEditableAbout}
            multiline
            characterRestriction={200}
          />
          <Button
            Icon={done}
            label="Done"
            title="done"
            onPress={onDone}
            loading={isUploading}
            containerStyle={styles().doneButton}
          />
        </View>
      </Modalize>
    );
  },
);

const { colours } = Theme.light;

const styles = () =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: colours.base,
    },
    content: {
      flex: 1,
    },
    avatar: {
      alignSelf: "center",
      height: 100,
      width: 100,
      marginTop: 20,
    },
    avatarImage: {
      backgroundColor: colours.placeholder,
      borderRadius: 100,
    },
    avatarOverlay: {
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
