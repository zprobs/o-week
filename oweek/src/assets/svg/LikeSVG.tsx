import React from 'react';
import Svg, { Path } from 'react-native-svg';
import getTheme from '@root/theme';

interface Props {
  liked: boolean;
}

const LikeSVG: React.FC<Props> = ({ liked }) => {
  const theme = getTheme();
  return (
    <Svg width={26} height={26} viewBox="0 0 24 24">
      <Path
        d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
        stroke={theme.palette.accent}
        strokeWidth={2}
        fill={liked ? theme.palette.lightBlue : 'none'}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default LikeSVG;
