import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useRef } from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import Fonts from '../../theme/Fonts';
import {Theme, ThemeStatic} from '../../theme/Colours';
import {AuthContext} from '../../context';
import {useNavigation} from "@react-navigation/native"
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {parseTimeElapsed} from '../../context';
import DeleteCardRightActions from '../ReusableComponents/DeleteCardRightActions';


const {colours} = Theme.light;
const { FontWeights, FontSizes } = Fonts;


const MessageCard = ({ chatId, image, name, participants, authorId, messageId, messageBody, numMessages, seen, time, isOnline }) => {
    const { authState } = useContext(AuthContext);
    const { readableTime } = parseTimeElapsed(time);
    const  navigation  = useNavigation();
    // const [messageSeen] = useMutation(MUTATION_SEEN_MESSAGE);
    //  const [deleteChat, { loading: deleteChatLoading, called: deleteChatCalled }] = useMutation(MUTATION_DELETE_CHAT);

    const setSeenAndNavigate = () => {
        // if (authorId !== user.id) {
        //     messageSeen({ variables: { messageId } });
        // }
        navigation.navigate('Conversation', { chatId, image, name, participants, numMessages })
    };

    const isHighlighted = authorId !== authState.user.uid && !seen;

    const highlightStyle = isHighlighted ? {
        ...FontWeights.Regular,
        color: colours.text01
    } : null;

    const onlineDotColor = ThemeStatic.onlineDotColor[isOnline];
    const swipeableRef = useRef();

    const onDelete = () => {
        // if (!deleteChatLoading && !deleteChatCalled) {
        //     longPressDeleteNotification(() => {
        //         swipeableRef.current.close();
        //         deleteChat({ variables: { chatId } });
        //     });
        // }
    };

    const renderRightActions = (progress, dragX) => (
        <DeleteCardRightActions
            progress={progress}
            dragX={dragX}
            onDelete={onDelete}
        />
    );

    return (
         <Swipeable ref={swipeableRef} useNativeAnimations rightThreshold={-80} renderRightActions={renderRightActions}>
            <TouchableOpacity activeOpacity={0.90} onPress={setSeenAndNavigate} style={styles.container}>
                <View style={styles.avatar}>
                    <Image
                        source={{uri: image}}
                        style={styles.avatarImage}
                    />
                    <View style={[styles.onlineDot, { backgroundColor: onlineDotColor }]} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.nameText}>{name}{' '}</Text>
                    <View style={styles.content}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.messageText, highlightStyle]}>
                            {messageBody}
                        </Text>
                        <Text style={[styles.timeText, highlightStyle]}>
                            {` · ${readableTime}`}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
         </Swipeable>
    );
};

const styles =  StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 5,
        paddingLeft: 5
    },
    avatar: {
        height: 50,
        width: 50
    },
    avatarImage: {
        flex: 1,
        borderRadius: 50,
        backgroundColor: colours.placeholder
    },
    onlineDot: {
        position: 'absolute',
        width: 10,
        height: 10,
        bottom: 2.5,
        right: 2.5,
        borderRadius: 10
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    nameText: {
        ...FontWeights.Regular,
        ...FontSizes.Body,
        color: colours.text01
    },
    content: {
        flexDirection: 'row',
        paddingTop: 5
    },
    messageText: {
        ...FontWeights.Light,
        ...FontSizes.Caption,
        maxWidth: '70%',
        color: colours.text02
    },
    timeText: {
        ...FontWeights.Light,
        ...FontSizes.Caption,
        color: colours.text02
    }
});

export default MessageCard;
