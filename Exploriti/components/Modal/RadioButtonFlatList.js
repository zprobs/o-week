import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import {ThemeStatic} from '../../theme/Colours';

const {FontWeights, FontSizes} = Fonts;

const RadioButtonFlatList = React.forwardRef(({data, title, selectedData, setData}, ref) => {



    const renderItem = ({item}) => {
        const isSelected = (selectedData == item);
        return (
            <TouchableOpacity onPress={() => {setData(item); setTimeout(()=>ref.current.close(), 300) }} style={{flexDirection: 'row'}}>
                <RadioButton selected={isSelected}/>
                <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>

        );

    };

    const ItemSeparator = () => {
        return( <View style={styles.separator}/>);
    };

    const Header = () => {
      return <Text style={styles.header}>Select your {title}</Text>
    };

    const Footer = () => {
        return <View style={{height: 50}}/>
    };

    return (<Modalize
        ref={ref}
        flatListProps={{
            data: data,
            keyExtractor: item => item,
            renderItem: renderItem,
            ItemSeparatorComponent: ItemSeparator,
            scrollEnabled: false,

        }}
        adjustToContentHeight={true}
        HeaderComponent={Header}
        FooterComponent={Footer}
        closeAnimationConfig={{ spring: { speed: 1, bounciness: 1, }, timing: {duration: 300, easing: 'ease'} }}

/>);

});



function RadioButton({selected}) {
    return (
        <View style={styles.radioButton}>
            {
                selected ?
                    <View style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: ThemeStatic.lightBlue,
                        color: ThemeStatic.accent
                    }}/>
                    : null
            }
        </View>
    );
}

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
    text: {
        ...FontWeights.Regular,
        ...FontSizes.Label,
        marginLeft: 10,
        alignSelf: 'center'

    },
    separator: {
        height: 0.5,
        backgroundColor: ThemeStatic.text02,
        marginLeft: 15,
        marginRight: 15

    },
    header: {
        ...FontWeights.Bold,
        ...FontSizes.SubHeading,
        alignSelf: 'center',
        paddingVertical: 10
    }
});

export default RadioButtonFlatList
