import React, {useRef, useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import SearchBar from 'react-native-search-bar';
import {Theme} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import NewMessageBottomModal from '../Modal/NewMessageBottomModal';
import Icon from 'react-native-vector-icons/EvilIcons';

const {colours} = Theme.light;
const {FontWeights, FontSizes} = Fonts;

/**
 * Messages is the component that handles all the current users messages.
 * @returns {*}
 * @constructor
 */
export default function Messages() {
    const [chatSearch, setChatSearch] = useState();

    const newMessageBottomModalRef = useRef();


    const IconRight = () => (<Icon
        name='sc-telegram'
        size={28}
        color={colours.text01}
        onPress={() => newMessageBottomModalRef.current.open()}
    />);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Messages</Text>
                <IconRight />
            </View>
            <SearchBar
                value={chatSearch}
                onChangeText={setChatSearch}
                placeholder='Search for chats...'
                hideBackground={true}

            />
            <NewMessageBottomModal
                ref={newMessageBottomModalRef}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colours.base
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    title: {
        ...FontWeights.Bold,
        ...FontSizes.Heading,
        color: colours.text01
    }
});


