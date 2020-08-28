import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeStatic } from '../../theme/Colours';

/**
 * RadioButton for the RadioButtonFlatList
 * @param selected {boolean}
 * @returns {*}
 * @constructor
 */
const RadioButton = ({ selected }) => {
  return (
    <View style={styles.radioButton}>
      {selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: ThemeStatic.lightBlue,
            color: ThemeStatic.accent,
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: ThemeStatic.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});

export default RadioButton;
