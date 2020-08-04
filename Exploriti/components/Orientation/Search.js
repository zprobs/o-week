import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import Fonts from '../../theme/Fonts';
import { useQuery } from '@apollo/react-hooks';
import { SEARCH_ALL } from '../../graphql';
import Error from '../ReusableComponents/Error';
import { useDebounce } from '../Modal/SearchableFlatList';
import UserCard from '../ReusableComponents/UserCard';
import { Theme } from '../../theme/Colours';
import SectionHeader from '../ReusableComponents/SectionHeader';
import ImageCard from '../ReusableComponents/ImageCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackIcon from '../Menu/BackIcon';
import SearchUsers from '../../assets/svg/search-users.svg';
import ImgBanner from '../ReusableComponents/ImgBanner';
import { showMessage } from 'react-native-flash-message';
import { AuthContext, processWarning, refreshToken } from '../../context';

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 * Search allows the user to search for anything in the app by name
 * @returns {*}
 * @constructor
 */
export default function Search() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [query, setQuery] = useState(null);
  const debounceQuery = useDebounce(query, 300);
  const firstRenderRef = useRef(true);
  const searchRef = useRef();
  const { error, data } = useQuery(SEARCH_ALL, {
    variables: { limit: 15, query: `%${debounceQuery}%` },
    skip: firstRenderRef.current || debounceQuery === '',
  });
  const navigation = useNavigation();
  const isFocused = useIsFocused();


  useEffect(()=>{
    if (!isFocused && searchRef.current) {
      searchRef.current.blur();
    } else if (isFocused && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isFocused])



  if (error) {
    processWarning(error, 'Server Error')
  }

  const listData =
    data &&
    (data.users.length > 0 || data.groups.length > 0 || data.events.length > 0)
      ? [
          {
            title: 'Users',
            data: data ? data.users : [],
          },
          {
            title: 'Orientation Groups',
            data: data ? data.groups : [],
          },
          {
            title: 'Events',
            data: data ? data.events : [],
          },
        ]
      : null;

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    }
  }, [debounceQuery]);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  if (error) return <Error e={error} />;

  const renderItem = ({ item, section }) => {
    if (section.title === 'Users')
      return (
        <UserCard
          name={item.name}
          image={item.image}
          userId={item.id}
          style={styles.userCard}
        />
      );
    if (section.title === 'Orientation Groups' || section.title === 'Events') {
      let screen, options, Card;
      if (section.title === 'Events') {
        screen = 'EventScreen';
        options = { eventId: item.id };
        Card = () => <ImageCard eventId={item.id} />;
      } else {
        screen = 'GroupScreen';
        options = { groupId: item.id };
        Card = () => <ImageCard groupId={item.id} />;
      }
      return (
        <TouchableOpacity onPress={() => navigation.navigate(screen, options)}>
          <Card />
        </TouchableOpacity>
      );
    }
    return <Item title={item} />;
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <BackIcon />
        <View style={{ width: '90%' }}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Search for users, groups or events..."
            hideBackground={true}
            ref={searchRef}
          />
        </View>
      </View>
      <SectionList
        sections={listData}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={SectionHeader}
        style={{ backgroundColor: colours.white }}
        ListEmptyComponent={listEmptyComponent}
      />
    </SafeAreaView>
  );
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const listEmptyComponent = () => (
  <ImgBanner Img={SearchUsers} placeholder="" spacing={0.15} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  title: {
    ...FontSizes.Caption,
    ...FontWeights.Regular,
  },
  userCard: {
    marginVertical: 7,
    marginLeft: 5,
  },
});
