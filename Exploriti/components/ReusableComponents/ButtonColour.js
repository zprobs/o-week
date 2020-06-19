import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Fonts from "../../theme/Fonts";
import { ThemeStatic } from "../../theme/Colours";
import LoadingDots from './LoadingDots';

const { FontWeights, FontSizes } = Fonts;
/**
 * A styled button for general use
 * @param Icon An optional Icon that will apear to the left of any text in the button
 * @param label The text of the button
 * @param onPress The function which the button invokes
 * @param loading Weather the function has executed or is still waiting
 * @param containerStyle Additional style customization for sontainer
 * @param labelStyle Additional style customization for button text
 * @param color The background color of the button
 * @param light Weather or not the label text is light or dark
 * @constructor
 */
const ButtonColour = ({
  Icon,
  label,
  onPress,
  loading,
  containerStyle,
  labelStyle,
  colour,
  light,
}) => {
  const styles = StyleSheet.create({
    container: {
      height: 40,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: Icon ? "space-between" : 'center',
      paddingVertical: 5,
      borderRadius: 40,
      backgroundColor: colour,
    },
    label: {
      ...FontWeights.Regular,
      ...FontSizes.Body,
      marginLeft: 5,
      color: light ? ThemeStatic.white : ThemeStatic.accent,
      justifyContent: 'center'
    },
    icon :{
      marginRight: 20,
    }
  });

  let content = <LoadingDots background={'#fafafa'} activeBackground={ThemeStatic.white} />
  if (!loading)
    content = (
      <>
        {Icon && <View style={{marginLeft: 20}}/> }
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {Icon && (
            <View style={styles.icon}>
              <Icon />
            </View>
            )}
      </>
    );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={loading}
      style={[styles.container, containerStyle]}>
      {content}
    </TouchableOpacity>
  );
};

export default ButtonColour;
