import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import { ThemeStatic } from '../../theme/Colours';
import RadioButton from '../ReusableComponents/RadioButton';

const { FontWeights, FontSizes } = Fonts;

const RadioButtonFlatList = React.forwardRef(
  /**
   * a list of radio buttons used to select string option
   * @param data {[string]} the String array intended to be displayed
   * @param title {string} Select your <<title>>
   * @param selectedData {string}
   * @param setData A function to set the selected data after it has been picked
   * @param ref
   * @returns {JSX.Element}
   */
  ({ data, title, selectedData, setData }, ref) => {
    const renderItem = ({ item }) => {
      const isSelected = selectedData === item;
      return (
        <TouchableOpacity
          onPress={() => {
            setData(item);
            setTimeout(() => ref.current.close(), 300);
          }}
          style={{ flexDirection: 'row' }}>
          <RadioButton selected={isSelected} />
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      );
    };

    const ItemSeparator = () => {
      return <View style={styles.separator} />;
    };

    const Header = () => {
      return <Text style={styles.header}>Select your {title}</Text>;
    };

    const Footer = () => {
      return <View style={{ height: 50 }} />;
    };

    return (
      <Modalize
        ref={ref}
        flatListProps={{
          data: data,
          keyExtractor: (item) => item,
          renderItem: renderItem,
          ItemSeparatorComponent: ItemSeparator,
          scrollEnabled: false,
        }}
        adjustToContentHeight={true}
        HeaderComponent={Header}
        FooterComponent={Footer}
        closeAnimationConfig={{
          spring: { speed: 1, bounciness: 1 },
          timing: { duration: 300, easing: 'ease' },
        }}
      />
    );
  },
);

const styles = StyleSheet.create({
  text: {
    ...FontWeights.Regular,
    ...FontSizes.Label,
    marginLeft: 10,
    alignSelf: 'center',
  },
  separator: {
    height: 0.5,
    backgroundColor: ThemeStatic.text02,
    marginLeft: 15,
    marginRight: 15,
  },
  header: {
    ...FontWeights.Bold,
    ...FontSizes.SubHeading,
    alignSelf: 'center',
    paddingVertical: 10,
  },
});

export default RadioButtonFlatList;
