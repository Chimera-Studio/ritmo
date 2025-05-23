import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

type Props = {
  style?: Object,
  fill: string,
};

function Logo(props: Props) {
  return (
    <Svg viewBox="0 0 1042.8 285.54" style={props.style}>
      <Path
        fill={props.fill}
        d="M151.8,62A51.13,51.13,0,0,1,59,91.6V281.4H0V62Z"
        transform="translate(0 0.1)"
      />
      <Rect fill={props.fill} x="176.4" y="62.1" width="59" height="219.4" />
      <Path fill={props.fill} d="M457.2,281.4h0Z" transform="translate(0 0.1)" />
      <Path fill={props.fill} d="M289.9,61.3V62h0v-.7Z" transform="translate(0 0.1)" />
      <Path fill={props.fill} d="M354.5,62h0Z" transform="translate(0 0.1)" />
      <Path
        fill={props.fill}
        d="M791.6,196.9v84.5h-59V163.8c0-2.2-.1-4.4-.2-6.6-.4-8.8-1.3-17.5-4.2-26s-8-15.1-16.3-19c-3.4-1.6-7.2-2.1-10.8-2.8a42.63,42.63,0,0,0-32.9,6.8A35.53,35.53,0,0,0,654.4,134a75.87,75.87,0,0,0-2.2,7.8,30.78,30.78,0,0,0-.6,6.1V281.4H591.9v-4c0-28.9-.1-57.8-.1-86.7,0-6.3.1-12.6.1-18.9V161.1c0-4.4-.1-8.7-.2-13.1-.3-9.1-2.5-18-8-25.6A30.62,30.62,0,0,0,564.3,110c-4.3-.9-8.5-1.8-12.9-1.3-5.8.6-11.5,1.4-16.8,3.9-11.1,5.2-17.6,14.1-20.7,25.7a68.26,68.26,0,0,0-2.2,15.6V281.4h-59V61.3h59.1V87.2l.7-1.1h0l.2-.3.2-.2c0-.1.1-.1.2-.2a61.79,61.79,0,0,1,14.2-15.1,59.58,59.58,0,0,1,25.4-11,84.23,84.23,0,0,1,22.4-1.4,75.53,75.53,0,0,1,20.7,4.3,59.51,59.51,0,0,1,15.5,8.3,60.19,60.19,0,0,1,17.2,20.3c.3.5.5,1,.8,1.6.2.3.3.7.5,1l1.2,2.4,1.3-2.1.5-.7a74.6,74.6,0,0,1,19-19.4c.7-.5,1.3-.9,2-1.4a81.54,81.54,0,0,1,30.1-12.1,102.92,102.92,0,0,1,50.7,2.3c2.7.9,5.4,1.9,8,3,10.8,4.7,19.6,12,27.2,20.8,5.7,6.6,9.8,14.4,13,22.5a128.49,128.49,0,0,1,6.9,26.6,159.81,159.81,0,0,1,1.4,19.5C791.4,168.6,791.6,182.7,791.6,196.9Z"
        transform="translate(0 0.1)"
      />
      <Path fill={props.fill} d="M512.9,85.3l-.2.2.2-.2Z" transform="translate(0 0.1)" />
      <Path
        fill={props.fill}
        d="M367.4,284.3a58.14,58.14,0,0,1-5.8-.9C363.6,283.7,365.5,284,367.4,284.3Z"
        transform="translate(0 0.1)"
      />
      <Path
        fill={props.fill}
        d="M1042.8,169.5A111.5,111.5,0,1,1,931.3,58,111.47,111.47,0,0,1,1042.8,169.5Z"
        transform="translate(0 0.1)"
      />
      <Path
        fill={props.fill}
        d="M418.4,229.4v53.1h0a165.64,165.64,0,0,1-50.9,1.7h0l-5.8-.9c-10.8-1.9-21.9-5.4-31.8-11.4-.5-.3-1-.6-1.4-.9a8.79,8.79,0,0,0-1-.6l-1.8-1.2c-.6-.4-1.2-.8-1.7-1.2h-.1a64.62,64.62,0,0,1-10.5-9.8A83.14,83.14,0,0,1,301,238.3a131.44,131.44,0,0,1-8.3-28.1c-.5-3-1.3-7.5-1.6-10.6-.5-5.5-.5-8.8-.7-15.3-.1-1.6,0-4.4-.1-5.7v-4.7l-.2-61.2v-1H260.3V62H290v-.8h0l-.1-28.8h0V25.5l18-7.7.6-.2c3.1-1.4,6.2-2.7,9.3-4.1C327.6,9.2,337.3,5,347,.7l.7-.3,1.2-.5v62h69.6v49.6H349.2v6.8c0,19.7-.2,39.5.1,59.2.2,9.2.6,18.6,3.5,27.5.3.8.5,1.6.8,2.3a34.06,34.06,0,0,0,10.3,14.5c.1.1.2.1.3.2a3,3,0,0,0,.7.5l1.1.8a23.92,23.92,0,0,0,2.1,1.3l.6.3c16.1,8.7,38.8,6.1,46.7,4.8Z"
        transform="translate(0 0.1)"
      />
    </Svg>
  );
}

export default Logo;
