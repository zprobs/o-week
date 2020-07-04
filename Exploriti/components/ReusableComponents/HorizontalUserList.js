import React from 'react';
import {FlatList} from 'react-native';
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


    return (
      <FlatList data={data} renderItem={renderItem} horizontal={true} style={{...style, flexGrow: 0}}/>
    );
}

export default HorizontalUserList;
