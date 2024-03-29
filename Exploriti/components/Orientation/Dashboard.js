import React, { useContext, useMemo } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AuthContext, processWarning } from '../../context';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER, GET_RANDOM_USERS } from '../../graphql';
import ButtonColour from '../ReusableComponents/ButtonColour';
import Icon from 'react-native-vector-icons/Feather';
import SectionHeader from '../ReusableComponents/SectionHeader';
import { useNavigation } from '@react-navigation/native';
import ImageCard from '../ReusableComponents/ImageCard';
import { useSafeArea } from 'react-native-safe-area-context';
import {
  ListPlaceholder,
  TitlePlaceholder,
  SayHiPlaceholder,
} from '../Placeholders/DashboardPlaceholder';
import messaging from '@react-native-firebase/messaging';

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

/**
 * Dashboard is the main view where the user can see what is important and view the groups they are in
 * @returns The UI view for Dashboard
 * @constructor
 */
export default function Dashboard() {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const insets = useSafeArea();
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { id: authState.user.uid },
  });

  requestUserPermission();

  const listData = useMemo(
    () => [
      {
        title: 'My Groups',
        data: data.user.member ? data.user.member : [],
      },
      // {
      //     title: "Events",
      //     data: eventData ? eventData.events : []
      // }
    ],
    [data],
  );
  const renderItem = React.useCallback(
    ({ item, section }) => {
      let screen, options;

      if (section.title === 'My Groups') {
        screen = 'GroupScreen';
        options = { groupId: item.group.id };
      } else {
        screen = 'EventScreen';
        options = { event: item };
      }

      return (
        <TouchableOpacity onPress={() => navigation.navigate(screen, options)}>
          <ImageCard groupId={item.group.id} />
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  const SearchIcon = () => (
    <Icon name={'search'} color={ThemeStatic.text01} size={26} />
  );

  const Header = () => {
    const {
      data: sayHiData,
      loading: sayHiLoading,
      error: sayHiError,
    } = useQuery(GET_RANDOM_USERS, {
      variables: { userId: authState.user.uid },
    });
    let count = 0;

    if (sayHiError) {
      processWarning(sayHiError, 'Server Error');
    }

    return (
      <>
        <View style={{ marginHorizontal: 25 }}>
          {loading ? (
            <TitlePlaceholder />
          ) : (
            <>
              <Text style={styles.welcomeTitle}>Hi, {data.user.name}!</Text>
              <Text style={styles.welcomeSubTitle}>Say hi to someone new:</Text>
            </>
          )}
        </View>

        <ScrollView
          horizontal={true}
          style={styles.userScrollView}
          showsHorizontalScrollIndicator={false}>
          {sayHiLoading ? (
            <SayHiPlaceholder />
          ) : sayHiData ? (
            <>
              {sayHiData.getrandomusers.map((user) => {
                count++;
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Profile', { userId: user.id })
                    }
                    key={user.id}>
                    <Image
                      source={{ uri: user.image }}
                      style={{
                        ...styles.userImage,
                        marginTop: count % 2 === 0 ? 16 : 0,
                      }}
                      key={user.id}
                    />
                  </TouchableOpacity>
                );
              })}
              <View style={{ width: 15 }} />
            </>
          ) : null}
        </ScrollView>

        <View style={{ marginHorizontal: 25 }}>
          <ButtonColour
            colour={ThemeStatic.lightgray}
            label={'Search The App'}
            Icon={SearchIcon}
            labelStyle={styles.buttonText}
            containerStyle={styles.scheduleButton}
            onPress={() => {
              navigation.navigate('Search');
            }}
          />
        </View>
      </>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header />
        <ListPlaceholder />
      </View>
    );
  }

  if (error) {
    processWarning(error, 'Server Error');
    return null;
  }

  return (
    <View style={styles.container}>
      <SectionList
        bounces={true}
        sections={listData}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={SectionHeader}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: insets.top }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
  },
  welcomeTitle: {
    ...FontWeights.Bold,
    ...FontSizes.Heading,
    color: colours.text03,
    marginTop: 30,
  },
  welcomeSubTitle: {
    ...FontSizes.Label,
    ...FontWeights.Regular,
    color: colours.text02,
    paddingTop: 10,
  },
  buttonText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: ThemeStatic.text01,
  },
  scheduleButton: {
    marginVertical: 25,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    ...FontSizes.SubHeading,
    ...FontWeights.Bold,
    backgroundColor: '#fff',
    padding: 5,
  },
  userScrollView: {
    marginBottom: 10,
    marginTop: 24,
    paddingHorizontal: 15,
  },
  userImage: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginHorizontal: 8,
    backgroundColor: colours.placeholder,
  },
});
