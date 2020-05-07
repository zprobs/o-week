import React from "react";
import { Text, View } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Error from "../Error";

const GET_USER = gql`
  {
    users {
      id
      name
    }
  }
`;

export default function Profile() {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Error e={error} />;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {data.User.map(user => (
        <Text key={user.id}>
          Name: {user.name} Id: {user.id}
        </Text>
      ))}
    </View>
  );
}
