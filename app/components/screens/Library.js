// @flow
import React from 'react';
import type { Node } from 'react';
import { Text, View } from 'react-native';
import { Link } from 'react-router-dom';
import Svg, { Path } from 'react-native-svg';
import styles from '../../styles/styles';
import colors from '../../styles/colors';

const Library = (): Node => (
  <View style={styles.guideWrapper}>
    <Link to="/" style={styles.exit}>
      <Svg height="100%" width="100%" viewBox="0 0 352 352">
        <Path
          fill={colors.primaryDark}
          d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
        />
      </Svg>
    </Link>
    <Text>Recordings</Text>
  </View>
);

export default Library;
