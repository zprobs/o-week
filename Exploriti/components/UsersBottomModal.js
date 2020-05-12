import React, { useContext } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import UserCard from './UserCard';
import {Theme} from '../theme/Colours';

const { colours } = Theme.light;
const window = Dimensions.get('window').height;
const window05 = window * 0.05;

const UsersBottomModal = React.forwardRef(({ viewMode, handle, data, type }, ref) => {

    let heading;
    let subHeading;

    if (type === "Friends") {
        heading = 'Friends';
        if (viewMode) {
            subHeading = `People ${handle} is friends with`;
        } else {
            subHeading = 'People you are friends with';
        }
    }

    const listEmptyComponent = () => (
        <Text>No users found</Text>
    );

    const renderItem = ({ item }) => {
        const { id, avatar, handle, name } = item;
        return (
            <UserCard
                userId={id}
                avatar={avatar}
                handle={handle}
                name={name}
            />
        );
    };

    const header = () => (<ModalHeader heading={heading} subHeading={subHeading}/>);
    const listContainer = styles().listContainer;

    return (
      <Modalize
        ref={ref}
        modalStyle={styles().container}
        flatListProps={{
          showsVerticalScrollIndicator: false,
          data: data,
          ListEmptyComponent:  listEmptyComponent ,
          style:  listContainer ,
          renderItem:  renderItem ,
          ListHeaderComponent:  header ,
        }}
      />
    );
});

const styles = () => StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 20,
        backgroundColor: colours.base
    },
    content: {
        flex: 1,
        paddingBottom: window05
    },
    listContainer: {
        flex: 1
    },
    listItemContainer: {
        width: '106%'
    },
    listContentContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});

export default UsersBottomModal;
