import React, {useRef, useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import SearchBar from 'react-native-search-bar';
import {Theme} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import NewMessageBottomModal from '../Modal/NewMessageBottomModal';
import Icon from 'react-native-vector-icons/EvilIcons';
import GoBackHeader from '../Menu/GoBackHeader';
import MessageCard from './MessageCard';
import ImgBanner from '../ReusableComponents/ImgBanner';
import Images from '../../assets/images';

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

    const renderItem = ({ item }) => {

        const { id: chatId, participants, messages } = item;
      //  const [participant] = filterChatParticipants(user.id, participants);
        const participant = participants;
        const [lastMessage] = messages;

        const { id, image, name, lastSeen } = participant[0];
        console.log(name);
        console.log(participant)
        const {
            id: messageId,
            author: { id: authorId },
            seen,
            body: messageBody,
            createdAt: time
        } = lastMessage;

       // const isOnline = isUserOnline(lastSeen);

        const isOnline = true;

        return (
            <MessageCard
                chatId={chatId}
                participantId={id}
                image={image}
                name={name}
                authorId={authorId}
                messageId={messageId}
                messageBody={messageBody}
                seen={seen}
                time={time}
                isOnline={isOnline}
            />
        );
    };

    const listEmptyComponent = () => (
        <ImgBanner
            img={Images.emptyMessages}
            placeholder="No messages yet"
            spacing={0.16}
        />
    );

    const itemSeparatorComponent = () => (
        <View style={{height: 15}}/>
    )

    let content = (
      <FlatList
          showsVerticalScrollIndicator={false}
          data={dummyMSGS}
          ListEmptyComponent={listEmptyComponent}
          style={styles.messagesList}
          spacing={20}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeparatorComponent}
      />
    );



    return (
        <>
            <SafeAreaView style={styles.container}>
                <GoBackHeader title={"Messages"} titleStyle={styles.title} IconRight={IconRight}/>
                <SearchBar
                    value={chatSearch}
                    onChangeText={setChatSearch}
                    placeholder='Search for chats...'
                    hideBackground={true}

                />
                {content}
            </SafeAreaView>
            <NewMessageBottomModal ref={newMessageBottomModalRef} />
        </>
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
    },
    messagesList: {
        flex: 1,
        paddingHorizontal: 4
    }
});

const dummyMSGS = [
        {
            id: "434",
            participants: [{
                id: 80,
                image: "https://reactjs.org/logo-og.png",
                name: 'Kid Cudi',
                lastSeen: new Date(90),
            }],
            messages: [{
                id: 8,
                body: 'Crystal raindrops',
                seen: true,
                author: {
                    id: 1
                },
                createdAt: new Date()
            }]
        },

        {
            id: "444",
            participants: [{
                id: 1,
                image: "https://reactjs.org/logo-og.png",
                name: 'Pusha T',
                lastSeen: new Date(),
            }],
            messages: [{
                id: 2,
                body: 'hey wassup',
                seen: false,
                author: {
                    id: 999
                },
                createdAt:  new Date(2020, 4, 17)
            }]
        }
    ]


