import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import DarkBackground from '../../../app/components/elements/backgrounds/DarkBackground';

it('renders correctly', () => {
  renderer.create(<DarkBackground />);
});
