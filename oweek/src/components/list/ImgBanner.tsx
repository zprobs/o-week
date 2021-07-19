import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextStyle } from 'react-native';
import useStyles from './ImgBanner.styles';

const window = Dimensions.get('window').height;

interface ImgProps {
  height: number;
  width: number;
}

interface Props {
  Img: React.ComponentType<ImgProps>;
  placeholder: string;
  spacing?: number;
  textStyle?: TextStyle;
}

/**
 * ImgBanner used for displaying empty list component images
 */
const ImgBanner: React.FC<Props> = ({
  Img,
  placeholder,
  spacing = 0,
  textStyle,
}) => {
  const space = spacing * window;
  const styles = useStyles();

  return (
    <View style={[styles.container, { marginTop: space || undefined }]}>
      <Img height={window * 0.3} width={window * 0.3} />
      <Text style={[styles.placeholderText, textStyle]}>{placeholder}</Text>
    </View>
  );
};

export default ImgBanner;
