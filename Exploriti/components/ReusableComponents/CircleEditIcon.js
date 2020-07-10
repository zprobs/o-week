import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, View } from 'react-native';
import { ThemeStatic } from '../../theme/Colours';

/**
 *
 * @param onPress {function}
 * @param style
 * @param icon {string} Feather icon to be shown. Defaults to edit
 * @returns {*}
 * @constructor
 */
const CircleEditIcon = ({ onPress, style, icon }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <Icon
        name={icon ? icon : 'edit'}
        color={'#000'}
        size={23}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeStatic.white,
    height: 44,
    width: 44,
    borderRadius: 22,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.7,
  },
});

export default CircleEditIcon;
