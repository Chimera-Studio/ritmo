import React from 'react';
import { Svg, Path } from 'react-native-svg';

const Pause = (props) => {
  return (
    <Svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" style={props.style}>
      <Path
        fill="#DFE2EC"
        d="M8,0h14c4.4,0,8,3.6,8,8v64c0,4.4-3.6,8-8,8H8c-4.4,0-8-3.6-8-8V8C0,3.6,3.6,0,8,0z"
      />
      <Path
        fill="#DFE2EC"
        d="M58,0h14c4.4,0,8,3.6,8,8v64c0,4.4-3.6,8-8,8H58c-4.4,0-8-3.6-8-8V8C50,3.6,53.6,0,58,0z"
      />
    </Svg>
  );
};

export default Pause;
