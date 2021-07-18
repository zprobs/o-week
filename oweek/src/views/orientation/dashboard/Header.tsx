import React from 'react';
import { useQuery } from '@apollo/client';
import { GetRandomUsers } from '@graphql/User';
import {
  getRandomUsers,
  getRandomUsersVariables,
} from '@graphql/types/getRandomUsers';
import { processWarning } from '@util/messages';
import { Image, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  SayHiPlaceholder,
  TitlePlaceholder,
} from '@components/placeholders/DashboardPlaceholder';
import { useNavigation } from '@react-navigation/native';
import ButtonColour from '@components/interactable/ButtonColor';
import getTheme from '@root/theme';
import useStyles from './Header.styles';

interface Props {
  name: string;
  loading: boolean;
}

const Header: React.FC<Props> = ({ name, loading }) => {
  const styles = useStyles();
  const theme = getTheme();
  const navigation = useNavigation();
  const {
    data,
    loading: sayHiLoading,
    error,
  } = useQuery<getRandomUsers, getRandomUsersVariables>(GetRandomUsers, {
    variables: { userId: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3' },
  });
  let count = 0;

  if (error) {
    processWarning(error, 'Server Error');
  }

  const SearchIcon = () => (
    <Icon name="search" color={theme.palette.text01} size={26} />
  );

  return (
    <>
      <View style={{ marginHorizontal: 25 }}>
        {loading ? (
          <TitlePlaceholder />
        ) : (
          <>
            <Text style={styles.welcomeTitle}>Hi, {name}!</Text>
            <Text style={styles.welcomeSubTitle}>Say hi to someone new:</Text>
          </>
        )}
      </View>

      <ScrollView
        horizontal
        style={styles.userScrollView}
        showsHorizontalScrollIndicator={false}>
        {sayHiLoading ? (
          <SayHiPlaceholder />
        ) : (
          data && (
            <>
              {data.getrandomusers.map((user) => {
                count += 1;
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
          )
        )}
      </ScrollView>

      <View style={{ marginHorizontal: 25 }}>
        <ButtonColour
          color={theme.palette.lightgray}
          label="Search The App"
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

export default Header;
