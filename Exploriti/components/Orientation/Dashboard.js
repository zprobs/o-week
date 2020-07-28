import React, { useContext, useMemo } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  Image,
  TouchableOpacity,
  ScrollView, SafeAreaView,
} from 'react-native';
import { AuthContext } from '../../context';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER, GET_USERS_WHERE } from '../../graphql';
import ButtonColour from '../ReusableComponents/ButtonColour';
import Icon from 'react-native-vector-icons/Feather';
import SectionHeader from '../ReusableComponents/SectionHeader';
import { useNavigation } from '@react-navigation/native';
import ImageCard from '../ReusableComponents/ImageCard';

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 * Dashboard is the main view where the user can see what is important and what they need to know for the near future
 * @returns The UI view for Dashboard
 * @constructor
 */
export default function Dashboard() {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { id: authState.user.uid },
  });

  if (loading) {
    console.log('DashBoard Loading Current User');
    return null;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  console.log(data);

  const listData = useMemo(
    () => [
      {
        title: 'Groups',
        data: data.user.member ? data.user.member : [],
      },
      // {
      //     title: "Events",
      //     data: eventData ? eventData.events : []
      // }
    ],
    [data],
  );

  const SearchIcon = () => (
    <Icon name={'search'} color={ThemeStatic.text01} size={26} />
  );

  const Header = () => {
    const { data: sayHiData } = useQuery(GET_USERS_WHERE, {
      variables: { _nin: authState.user.uid },
    });
    let count = 0;

    return (
      <SafeAreaView>
        <View style={{ marginHorizontal: 25 }}>
          <Text style={styles.welcomeTitle}>Hi, {data.user.name}!</Text>
          <Text style={styles.welcomeSubTitle}>Say hi to someone new:</Text>
        </View>
        <ScrollView
          horizontal={true}
          style={styles.userScrollView}
          showsHorizontalScrollIndicator={false}>
          {sayHiData
            ? sayHiData.users.map((user) => {
                count++;
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push('Profile', { userId: user.id })
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
              })
            : null}
        </ScrollView>
        <View style={{ marginHorizontal: 25 }}>
          <ButtonColour
            colour={ThemeStatic.lightgray}
            label={'Search YorkU Hub'}
            Icon={SearchIcon}
            labelStyle={styles.buttonText}
            containerStyle={styles.scheduleButton}
            onPress={() => {
              navigation.navigate('Search');
            }}
          />
        </View>
      </SafeAreaView>
    );
  };

  const renderItem = React.useCallback(
    ({ item, section }) => {
      let screen, options;

      if (section.title === 'Groups') {
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

  return (
    <View style={styles.container}>
      <SectionList
        sections={listData}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={SectionHeader}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
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
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  userImage: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginHorizontal: 8,
    backgroundColor: colours.placeholder,
  },
});
