import React, { useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Dimensions, TouchableOpacity } from 'react-native';
import Fonts from '../../theme/Fonts';
import { ThemeStatic } from '../../theme/Colours';
import SearchableFlatList from '../Modal/SearchableFlatList';
import { GET_ALL_GROUPS, GET_ORIENTATION_GROUPS } from '../../graphql';
import GiveTrophyModal from '../Modal/GiveTrophyModal';
const { FontWeights, FontSizes } = Fonts;
const {width} = Dimensions.get('window');

const AdminConsole = () => {

  const groupListRef = useRef();
  const trophyRef = useRef();
  const [selected, setSelected] = useState();

  const openTrophyModal = () => {
    groupListRef.current.close();
    trophyRef.current.open();
  }

  return (
    <>
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.button, {backgroundColor: '#e84f8a'}]}>
          <Text style={styles.buttonText}>Create Global Event</Text>
        </View>
        <View style={[styles.button, {backgroundColor: '#7d38c4'}]}>
          <Text style={styles.buttonText}>Edit Orientation Group</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.button, {backgroundColor: '#e31f8a'}]}>
          <Text style={styles.buttonText}>Ban User</Text>
        </View>
        <View style={[styles.button, {backgroundColor: '#6118c4'}]}>
          <Text style={styles.buttonText}>Create Orientation Group</Text>
        </View>
      </View>

     <View style={styles.row}>
       <View style={[styles.button, {backgroundColor: '#b040c2'}]}>
         <Text style={styles.buttonText}>Send Announcement</Text>
       </View>
       <TouchableOpacity style={[styles.button, {backgroundColor: '#4118c4'}]} onPress={()=>groupListRef.current.open()}>
         <Text style={styles.buttonText}>Award Trophy</Text>
       </TouchableOpacity>
     </View>
      <View style={{height: 40}} />
    </SafeAreaView>
      <SearchableFlatList query={GET_ORIENTATION_GROUPS} hasImage={true} ref={groupListRef} title={'groups'} offset={80} setSelection={setSelected} cancelButtonText={'Next'} onPress={openTrophyModal} clearOnClose={true} />
      <GiveTrophyModal ref={trophyRef} selected={selected} />
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    width: width*0.4,
    height: width*0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...FontWeights.Bold,
    ...FontSizes.Label,
    color: 'white',
    marginHorizontal: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '98%'
  }
});

export default AdminConsole;
