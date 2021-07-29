import React from 'react';
import { Linking, Text, TouchableOpacity } from 'react-native';
import getHostnameFromRegex from '@util/getHostnameFromRegex';
import { linkError } from '@util/messages';
import Icon from 'react-native-vector-icons/Feather';
import getTheme from '@root/theme';
import useStyles from './RenderLink.styles';

interface Props {
  link: string | null;
}

const RenderLink: React.FC<Props> = ({ link }) => {
  const theme = getTheme();
  const styles = useStyles();
  if (!link) return null;
  const hostname = getHostnameFromRegex(link);

  const goToLink = () => {
    Linking.canOpenURL(link)
      .then((result) => {
        if (result) {
          Linking.openURL(link).catch((e) => console.log(e));
        } else {
          linkError('Link');
        }
      })
      .catch((error: Error) => {
        linkError('Link', error);
      });
  };

  return (
    <TouchableOpacity style={styles.linkContainer} onPress={goToLink}>
      <Text style={styles.linkText}>{hostname || 'External Link'}</Text>
      <Icon size={20} color={theme.palette.gold} name="chevron-right" />
    </TouchableOpacity>
  );
};

export default RenderLink;
