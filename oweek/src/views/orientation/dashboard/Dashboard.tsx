import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@graphql/User';
import { processWarning } from '@util/messages';

const Dashboard: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { id: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3' },
  });

  const listData = useMemo(
    () => [
      {
        title: 'My Groups',
        data: data.user.member ? data.user.member : [],
      },
    ],
    [data],
  );

  if (loading) {
    return null;
  }

  if (error) {
    processWarning(error, 'Server Error');
    return null;
  }

  return null;
};

export default Dashboard;
