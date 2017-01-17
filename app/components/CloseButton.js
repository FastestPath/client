import React from 'react';
import { TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const CloseButton = ({ onPress = () => {}, size = 23, color = 'black' }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <Icon
        name="close"
        size={size}
        color={color}
      />
    </TouchableHighlight>
  );
};

export default CloseButton;
