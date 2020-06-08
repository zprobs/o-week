import React, {useContext, useRef} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
} from "react-native";

import Fonts from "../../theme/Fonts";
import { Theme } from "../../theme/Colours";
import { ThemeStatic } from "../../theme/Colours";
import Icon from "react-native-vector-icons/EvilIcons";
import EditProfileBottomModal from "./EditProfileBottomModal";
import UsersBottomModal from "../Modal/UsersBottomModal";
import GroupBottomModal from "../Modal/GroupBottomModal";
import { UserContext} from '../../context';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {CHECK_FRIEND_REQUESTS, DELETE_FRIEND_REQUEST, GET_USER, SEND_FRIEND_REQUEST} from '../../graphql';
import Error from '../ReusableComponents/Error';
import GoBackHeader from '../Menu/GoBackHeader';
import OptionsIcon from '../Menu/OptionsIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import OptionsBottomModal from '../Modal/OptionsBottomModal';
import Loader from 'react-native-three-dots-loader'

const { FontWeights, FontSizes } = Fonts;

const { colours } = Theme.light;

/**
 * Profile is the screen which will display a users profile. Has two states: isCurrentUser = true or false
 * @param route The navigation route parameters set when navigating to this page using react-navigation. If it has a parameter userId then the page
 * will render as not the current user.
 * @returns {*}
 * @constructor
 */
export default function Profile({ route }) {
    const editProfileBottomModalRef = useRef();
    const optionsBottomModalRef = useRef();
    const usersBottomModalRef = useRef();
    const groupBottomModalRef = useRef();
    const { userState } = useContext(UserContext);

    const userId = route.params ? route.params.userId : null;

    const isCurrentUser = userId == null || userState.id === userId;

    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id: userId },
        skip: isCurrentUser,
    });

    let description, name, image, program, year;

    if (!isCurrentUser) {
        if (loading) return <Text>Loading...</Text>;
        if (error) return <Error e={error} />;
        description = data.user.description;
        name = data.user.name;
        image = "https://reactjs.org/logo-og.png";
        program = data.user.program;
        year = data.user.year;
    } else {
        description = userState.description;
        name = userState.name;
        image = userState.image;
        program = userState.program;
        year = userState.year;
    }

    const onEdit = () => editProfileBottomModalRef.current.open();
    const onOptions = () => optionsBottomModalRef.current.open();
    const onFriendsOpen = () => usersBottomModalRef.current.open();
    const onGroupsOpen = () => groupBottomModalRef.current.open();

    const renderInteractions = () => {
        if (isCurrentUser) return null;
        return <UserInteractions userId={userId}/>;
    };

    return (
        <>
            <SafeAreaView>
                {isCurrentUser ? null : (
                    <GoBackHeader
                        IconRight={OptionsIcon}
                        IconRightOnPress={onOptions}
                    />
                )}
                <ProfileCard
                    userId={userId}
                    editable={isCurrentUser}
                    description={description}
                    name={name}
                    program={program}
                    image={image}
                    year={year}
                    onEdit={onEdit}
                    onFriendsOpen={onFriendsOpen}
                    onGroupsOpen={onGroupsOpen}
                    renderInteractions={renderInteractions}
                />
            </SafeAreaView>
            <UsersBottomModal
                ref={usersBottomModalRef}
                data={null}
                type="Friends"
            />
            <GroupBottomModal ref={groupBottomModalRef} data={null} type="Member" />
            {isCurrentUser ? (
                <EditProfileBottomModal
                    ref={editProfileBottomModalRef}
                    image={image}
                    name={name}
                    program={program}
                    year={year}
                    description={description}
                />
            ) : (
                <OptionsBottomModal ref={optionsBottomModalRef} />
            )}
        </>
    );
}

const EditProfile = ({ onEdit }) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onEdit}
            style={styles.editProfile}>
            <Icon name="pencil" size={25} color={ThemeStatic.white} />
        </TouchableOpacity>
    );
};

const Connections = ({ total, type, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.95}
            onPress={onPress}
            style={styles.connections}>
            <Text style={styles.connectionsText}>{total}</Text>
            <Text style={styles.connectionsType}>{type}</Text>
        </TouchableOpacity>
    );
};

/**
 * Profile Card is the UI Component for a user's profile page.
 * @param image Profile picture
 * @param editable Weather or not a user can edit the page. Only true when it is the current user.
 * @param onEdit Opens the EditProfileBottomModal
 * @param onFriendsOpen Opens the UserBottomModal
 * @param onGroupsOpen Opens the GroupBottomModal
 * @param name
 * @param program
 * @param description
 * @param renderInteractions Will render the ADD FRIEND and MESSAGE buttons if it exists. Should only be included when the profile is not the current user.
 * @returns {*}
 * @constructor
 */
const ProfileCard = ({
                         userId,
                         image,
                         editable,
                         onEdit,
                         onFriendsOpen,
                         onGroupsOpen,
                         name,
                         program,
                         description,
                         renderInteractions,
                     }) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Connections onPress={onFriendsOpen} total={0} type="FRIENDS" />
                <ImageBackground
                    source={{ uri: image ? image : "" }}
                    style={styles.image}
                    imageStyle={styles.avatarImage}>
                    {editable && <EditProfile onEdit={onEdit} />}
                </ImageBackground>
                <Connections onPress={onGroupsOpen} total={0} type="GROUPS" />
            </View>
            <View style={styles.name}>
                <Text style={styles.usernameText}>{name}</Text>
                <Text style={styles.programText}>{program}</Text>
            </View>
            {renderInteractions && renderInteractions()}
            <View style={styles.description}>
                <Text style={styles.descriptionTitle}>About</Text>
                <Text style={styles.descriptionText}>{description}</Text>
            </View>
        </View>
    );
};

/**
 * Render the buttons for Friend Requests and Messaging
 * @param userId The userId of the profile in question. Not the current user.
 * @returns {*}
 * @constructor
 */
const UserInteractions = ({userId}) => {

    const {userState} = useContext(UserContext);

    const [sendRequest, { error: sendError, loading: sendLoading}] = useMutation(SEND_FRIEND_REQUEST, {
        variables: { sender: userState.id, recipient: userId },
        refetchQueries: ["CHECK_FRIEND_REQUESTS"],
        awaitRefetchQueries: true
    });

    const [deleteRequest, { error: deleteError, loading: deleteLoading}] = useMutation(DELETE_FRIEND_REQUEST, {
        variables: { sender: userState.id, recipient: userId },
        refetchQueries: ["CHECK_FRIEND_REQUESTS"],
        awaitRefetchQueries: true
    });

    const {data, loading, error: queryError} = useQuery(CHECK_FRIEND_REQUESTS, {
        variables: {currentUser: userState.id, otherUser: userId  },
        fetchPolicy: "no-cache"
    });


    let content;
    let friendInteraction = () => {return undefined};


    if (loading || sendLoading || deleteLoading) {
        content = <LoadingIndicator/>;
    } else if (queryError || sendError || deleteError) {
        content = (
            <Text style={styles.followInteractionText}>{queryError ? queryError.message : sendError ?  sendError.message: deleteError.message}</Text>
        );
    } else if (data.user.friendRequestsReceived.length !== 0) {
        content = (
            <Text style={styles.followInteractionText}>
                ACCEPT FRIEND REQUEST
            </Text>
        );
    } else if (data.user.friendRequestsSent.length !== 0) {
        content = (
            <Text style={styles.followInteractionText}>REQUEST PENDING</Text>
        );
        friendInteraction = () => deleteRequest();
    } else {
        content = <Text style={styles.followInteractionText}>ADD FRIEND</Text>;
        friendInteraction =  () => sendRequest();
    }


    const messageInteraction = async () => {


    };

    return (
        <View style={styles.userInteractionsContainer}>
            <TouchableOpacity activeOpacity={0.90} onPress={friendInteraction} style={styles.followInteraction}>
                {content}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.90} onPress={messageInteraction} style={styles.messageInteraction}>
                <Text style={styles.messageInteractionText}>MESSAGE</Text>
            </TouchableOpacity>
        </View>
    );
};

const LoadingIndicator = () => (
    <View style={styles.loadingIndicatorView}>
        <Loader
            size={6}
            activeBackground={colours.white}
            background={colours.white}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        paddingBottom: 4,
        paddingHorizontal: 15,
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    image: {
        height: 120,
        width: 120,
    },
    avatarImage: {
        backgroundColor: colours.placeholder,
        borderRadius: 120,
    },
    editProfile: {
        position: "absolute",
        bottom: -10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        width: 60,
        height: 32,
        borderWidth: 2,
        borderColor: colours.base,
        backgroundColor: colours.accent,
    },
    connections: {
        alignItems: "center",
        justifyContent: "center",
    },
    connectionsText: {
        ...FontWeights.Regular,
        ...FontSizes.SubHeading,
        color: colours.text01,
    },
    connectionsType: {
        ...FontWeights.Bold,
        ...FontSizes.Caption,
        color: colours.text02,
        marginTop: 5,
    },
    name: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
    },
    usernameText: {
        ...FontWeights.Bold,
        ...FontSizes.SubHeading,
        color: colours.text01,
    },
    programText: {
        ...FontWeights.Bold,
        ...FontSizes.Body,
        color: colours.text02,
        marginTop: 5,
    },
    description: {
        padding: 16,
        marginTop: 16,
        backgroundColor: colours.accent,
        borderRadius: 10,
        marginBottom: 10,
    },
    descriptionTitle: {
        ...FontWeights.Regular,
        ...FontSizes.Body,
        color: colours.white,
    },
    descriptionText: {
        ...FontWeights.Light,
        ...FontSizes.Body,
        color: colours.white,
        marginTop: 5,
    },
    userInteractionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    followInteraction: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        paddingVertical: 7,
        borderRadius: 40,
        backgroundColor: colours.accent
    },
    messageInteraction: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        paddingVertical: 7,
        borderRadius: 40,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colours.accent
    },
    followInteractionText: {
        ...FontWeights.Light,
        ...FontSizes.Caption,
        color: colours.white
    },
    messageInteractionText: {
        ...FontWeights.Light,
        ...FontSizes.Caption,
        color: colours.accent
    },
    loadingIndicatorView: {
        height: 14,
        justifyContent: 'center'
    }
});
