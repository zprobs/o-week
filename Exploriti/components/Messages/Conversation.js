import React, {useContext, useRef, useState} from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import {AuthContext} from '../../context';
import {useMutation, useSubscription} from '@apollo/react-hooks';
import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import GoBackHeader from '../Menu/GoBackHeader';
import {Theme} from '../../theme/Colours';
import ChatHeaderImage from './ChatHeaderImage';
import CustomComposer from './CustomComposer';
import CustomMessageText from './CustomMessageText';
import CustomSend from './CustomSend';
import CustomScrollToBottom from './CustomScrollToBottom';
import CustomInputToolbar from './CustomInputToolbar';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {GET_MESSAGES, SEND_MESSAGE} from '../../graphql';

const {colours} = Theme.light;


const Conversation = () => {
    const route = useRoute();
    const { chatId, name, image, participants, numMessages } = route.params;
    const { navigate } = useNavigation();
    const { authState } = useContext(AuthContext);
    const [sendMessage] = useMutation(SEND_MESSAGE)
    const [messages, setMessages] = useState([]);
    const [limit, setLimit] = useState(15);

    const {data, loading, error} = useSubscription(GET_MESSAGES, {
        variables: {
            chatId: chatId,
            offset: numMessages - limit
        },
    });

    if (!loading && messages.length !== data.messages.length) {
        setMessages(data.messages);
    }

    // const [queryChat, {
    //     called: chatQueryCalled,
    //     data: chatQueryData,
    //     loading: chatQueryLoading,
    //     error: chatQueryError
    // }] = useLazyQuery(QUERY_CHAT, {
    //     variables: { chatId },
    //     fetchPolicy: 'network-only'
    // });
    // const { data: chatSubscriptionData, loading: chatSubscriptionLoading } = useSubscription(SUBSCRIPTION_CHAT, {
    //     variables: { chatId }
    // });
    // const [addMessage] = useMutation(MUTATION_ADD_MESSAGE);
    // const [connectChat] = useMutation(MUTATION_CONNECT_CHAT_TO_USERS);

    // useEffect(() => {
    //     if (!chatSubscriptionLoading) {
    //         setMessages(chatSubscriptionData.chat.messages);
    //     } else if (chatSubscriptionLoading) {
    //         if (chatQueryCalled && !chatQueryLoading) {
    //             setMessages(chatQueryData.chat.messages);
    //         } else if (!chatQueryCalled) {
    //             queryChat();
    //         }
    //     }
    // }, [chatQueryData, chatQueryCalled, chatQueryLoading, chatSubscriptionData, chatSubscriptionLoading]);

    const onSend = (newMessage) => {
        newMessage = newMessage[0];
        console.log(chatId, newMessage.user._id, newMessage.createdAt, newMessage.text)
        sendMessage({
            variables: {
                chatId: chatId,
                senderId: newMessage.user._id,
                date: newMessage.createdAt,
                body: newMessage.text
            },
        });
    };

    const loadMoreMessages = ({nativeEvent}) => {
        const { contentOffset } = nativeEvent;
        if (contentOffset.y === 0) {
            console.log("scrolling");
            setLimit(limit + 5 >= numMessages ? numMessages : limit + 5);
        }
    }

    const handlePressAvatar = (user) => {
        navigate('Profile', { userId: user._id });
    };

    const handleTitlePress = () => {
        if (participants.length === 2) {
            const userId = participants.filter((participant) => participant._id !== authState.user.uid)[0]._id;
            navigate('Profile', { userId: userId });
        } else {
            console.log("Maybe we can show a modal of users in this chat?")
        }
    };

    //let content = <ConversationScreenPlaceholder />

    let content = <Text>Loading...</Text>

   // if (chatQueryCalled && !chatQueryLoading && !chatQueryError) {
    //const transform = transformMessages(messages);
    content = (
        <GiftedChat
            scrollToBottom
            alwaysShowSend
            isLoadingEarlier={limit !== numMessages}
            loadEarlier={limit !== numMessages}
            inverted={false}
            maxInputLength={200}
            messages={messages}
            scrollToBottomComponent={CustomScrollToBottom}
            textInputProps={{disable: true}}
            renderComposer={composerProps => <CustomComposer {...composerProps} />}
            renderMessageText={CustomMessageText}
            renderSend={CustomSend}
            renderInputToolbar={CustomInputToolbar}
            onPressAvatar={handlePressAvatar}
            onSend={onSend}
            user={{_id: authState.user.uid}}
            bottomOffset={ifIphoneX(20, -10)}
            keyboardShouldPersistTaps={null}
            listViewProps={{
                showsVerticalScrollIndicator: false,
                style: {marginBottom: 16},
                scrollEventThrottle: 400,
                onScroll: loadMoreMessages
            }}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <GoBackHeader
                title={name}
                onTitlePress={handleTitlePress}
                ContentLeft={() => <ChatHeaderImage image={image} onPress={handleTitlePress} />}
                titleStyle={styles.headerTitleStyle}
            />
            {content}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.base
    },
    headerTitleStyle: {
        marginLeft: 0
    }
});

export default Conversation;
