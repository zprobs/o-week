import React from 'react';
import { FlatList, View } from 'react-native';
import HorizontalUserCard from './HorizontalUserCard';

/**
 * List of HorizontalUserCard
 * @param data
 * @param style
 * @returns {*}
 * @constructor
 */
const HorizontalUserList = ({data, style}) => {

    const renderItem = ({item}) => {
        const {id, name, image} = item;
        return <HorizontalUserCard image={image} name={name} id={id} key={id.toString()} />
    }

    const Header = () => <View style={{width: 10}} />

    return (
      <FlatList data={data} renderItem={renderItem} horizontal={true} style={{...style, flexGrow: 0}} ListHeaderComponent={Header} showsHorizontalScrollIndicator={false}/>
    );
}

export default HorizontalUserList;
