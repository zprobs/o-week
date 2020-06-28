import React from 'react';
import {FlatList} from 'react-native';
import HorizontalUserCard from './HorizontalUserCard';

const HorizontalUserList = ({data, style}) => {

    const renderItem = ({item}) => {
        const {id, name, image} = item;
        return <HorizontalUserCard image={image} name={name} id={id} key={id} />
    }


    return (
      <FlatList data={data} renderItem={renderItem} horizontal={true} style={style}/>
    );
}

export default HorizontalUserList;
