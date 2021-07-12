import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@graphql/User';

const Dashboard: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { id: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3' },
  });
  console.log({ error });
  console.log({ data });

  return null;
};

export default Dashboard;
