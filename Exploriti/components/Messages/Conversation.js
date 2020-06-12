import React, {useContext, useState} from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import {AuthContext} from '../../context';
import {useMutation} from '@apollo/react-hooks';
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

const {colours} = Theme.light;


const Conversation = () => {
    const route = useRoute();
    const { chatId, name, image, targetId } = route.params;
    const { navigate } = useNavigation();
    const { authState } = useContext(AuthContext);
    const [messages, setMessages] = useState([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 10,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
    ],);

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

    const onSend = async updatedMessages => {
        const isFirstMessage = messages.length === 0;
        const [updatedMessage] = updatedMessages;
        if (isFirstMessage) {
            // await connectChat({
            //     variables: {
            //         chatId,
            //         userId: user.id,
            //         targetId
            //     }
            // });
        }
        // addMessage({
        //     variables: {
        //         chatId,
        //         authorId: user.id,
        //         body: updatedMessage.text
        //     }
        // });
    };

    const navigateToProfile = () => {
        navigate('Profile', { userId: targetId });
    };

    //let content = <ConversationScreenPlaceholder />

    let content = <Text>Loading...</Text>

   // if (chatQueryCalled && !chatQueryLoading && !chatQueryError) {
    //const transform = transformMessages(messages);
    const transform = messages
    content = (
        <GiftedChat
            scrollToBottom
            alwaysShowSend
            inverted={false}
            maxInputLength={200}
            messages={transform}
            scrollToBottomComponent={CustomScrollToBottom}
            textInputProps={{disable: true}}
            renderComposer={composerProps => <CustomComposer {...composerProps} />}
            renderMessageText={CustomMessageText}
            renderSend={CustomSend}
            renderInputToolbar={CustomInputToolbar}
            onSend={onSend}
            onPressAvatar={navigateToProfile}
            user={{_id: authState.user.uid}}
            bottomOffset={ifIphoneX(20, -10)}
            keyboardShouldPersistTaps={null}
            listViewProps={{showsVerticalScrollIndicator: false, style: {marginBottom: 16}}}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <GoBackHeader
                title={name}
                onTitlePress={navigateToProfile}
                ContentLeft={() => <ChatHeaderImage image={image} onPress={navigateToProfile} />}
                titleStyle={styles.headerTitleStyle}
            />
            {content}
        </SafeAreaView>
    );
};

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.base
    },
    headerTitleStyle: {
        marginLeft: 0
    }
});

export default Conversation;
