import React from 'react';
import {FlatList} from 'react-native';
import DetailedUserCard from './DetailedUserCard';

const DetailedUserList = ({data, style}) => {

    const renderItem = ({item}) => {
        const {id, name, image, isLeader} = item;
        return <DetailedUserCard image={image} name={name} id={id} key={id} isLeader={isLeader}/>
    }


    return (
      <FlatList data={data} renderItem={renderItem} horizontal={true} style={style}/>
    );
}

export default DetailedUserList;
