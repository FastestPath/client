import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native';

import {
  margin,
  paddingHorizontal,
  borderRadius
} from '../../styles';

import Svg, { Path, Text } from 'react-native-svg';

import {
  BACKGROUND,
  STATIONS,
  LABELS,
  WEEKDAY_LINES,
  WEEKEND_LINES,
  JSQ_HOB_WEEKEND,
  HOB_33,
  HOB_WTC,
  JSQ_33,
  NWK_WTC
} from './MapAssets';

const ORIGINAL_WIDTH = 758.0;
const ORIGINAL_HEIGHT = 224.0;
const RATIO = ORIGINAL_HEIGHT / ORIGINAL_WIDTH;

const PADDING = paddingHorizontal;

const width = Dimensions.get('window').width - PADDING;
const height = width * RATIO;
const viewBox =  `0 0 ${ORIGINAL_WIDTH} ${ORIGINAL_HEIGHT}`

const stylesheet = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius
  }
});

let index = 0;

const createPaths = (data) => {
  return data.map((path) => <Path key={`path-${index++}`} {...path} />);
};

const createLabels = (data) => {
  return data.map(({value, ...coords}) => (
    <Text
      key={`text-${index++}`}
      {...coords}
      fill="black"
      stroke="white"
      fontSize="21"
      fontWeight="bold"
    >
      {value}
    </Text>
  ));
};

const push = (onto, elems) => {
  Array.prototype.push.apply(onto, elems);
};

const paths = [];

const background = createPaths(BACKGROUND);
push(paths, background);

const weekDayLines = createPaths(WEEKDAY_LINES);
push(paths, weekDayLines);

const stations = createPaths(STATIONS);
push(paths, stations);

const labels = createLabels(LABELS);
push(paths, labels);

const StationMap = (props) => {

  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      style={stylesheet.container}
    >
      {paths}
    </Svg>
  );

};

export default StationMap;
