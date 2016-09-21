/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker,
  TimePickerAndroid,
  TouchableNativeFeedback
} from 'react-native';

import Button from 'react-native-button';
const Item = Picker.Item;

const stations = ["33rd Street", "23rd Street", "14th Street", "9th Street", "Christopher Street", "Hoboken"];

class path_timer extends Component {

  state = {
    //isoFormatText: 'pick a time (24-hour format)',
    presetHour: 12,
    presetMinute: 0,
    //presetText: 'pick a time, default: 4:04AM',
    //simpleText: 'pick a time',

    timePromptText: "Click to pick the time you'd like to arrive",
    pickerMessage: "Select the PATH station you want to get off at"
  };

  showPicker = async (options) => {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      var newState = {};
      if (action === TimePickerAndroid.timeSetAction) {
        newState['Text'] = _formatTime(hour, minute);
        newState['Hour'] = hour;
        newState['Minute'] = minute;
      } else if (action === TimePickerAndroid.dismissedAction) {
        newState['Text'] = 'dismissed';
      }

      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example: `, message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to PATH timer!
        </Text>
        <Text style={styles.instructions}>
          Select which station you'd like to arrive at, and what time you'd like to be there.
        </Text>

        <Button
          onPress={this.showPicker.bind(this, {
              hour: this.state.presetHour,
              minute: this.state.presetMinute,
            })}>
          {this.state.timePromptText}
        </Button>

        <Picker
          style={styles.picker}
          selectedValue={this.state.pickerValue || this.state.pickerMessage}
          onValueChange={this.onValueChange.bind(this)}
          mode="dropdown">
          { stations.map((station, index) => {
            return (
              <Item label={station} value={index} key={index} />
            );
          })}
        </Picker>

        <Text>
          You want to arrive at {stations[this.state.pickerValue]} station at {this.state.Hour}:{this.state.Minute}
        </Text>

      </View>
    );
  }

  onValueChange = (value: string) => {
    const newState = {};
    newState['pickerValue'] = value;
    this.setState(newState);
  };
}

function _formatTime(hour, minute) {
  return hour + ':' + (minute < 10 ? '0' + minute : minute);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    color: 'black',
  },
  button: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 7,
    borderColor: 'blue',
    borderRadius: 2,
    borderWidth: 3
  },
  picker: {
    width: 100,
  },
});

AppRegistry.registerComponent('path_timer', () => path_timer);
