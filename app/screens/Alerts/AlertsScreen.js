import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';

import {
  margin,
  paddingVertical,
  paddingHorizontal
} from '../../styles';

import fetchAlerts from '../../actions/fetchAlerts';

const stylesheet = StyleSheet.create({
  alertCard: {
    backgroundColor: '#111',
    paddingVertical,
    paddingHorizontal,
    margin: margin / 2
  },
  loadingText: {
    textAlign: 'center',
    color: 'white'
  },
  alertBody: {
    color: 'white'
  },
  alertCreatedOn: {
    color: 'white'
  }
});

const AlertsScreen = React.createClass({

  propTypes: {
    alerts: React.PropTypes.array.isRequired,
    updatedOn: React.PropTypes.instanceOf(Date),
    isLoading: React.PropTypes.bool.isRequired
  },

  contextTypes: {
    route: React.PropTypes.string.isRequired
  },

  componentWillMount() {
    this.props.dispatch(fetchAlerts());
  },

  renderLoading() {
    return (
      <View>
        <Text style={stylesheet.loadingText}>Fetching latest alerts...</Text>
      </View>
    );
  },

  renderList() {
    return this.props.alerts.map((alert, i) => <AlertCard key={i} {...alert} />);
  },

  render() {
    const { isLoading } = this.props;
    return (
      <View>
        <View style={stylesheet.header}>
          <Text>Latest Alerts</Text>
        </View>
        <ScrollView style={stylesheet.list}>
          {isLoading ? this.renderLoading() : this.renderList()}
        </ScrollView>
      </View>
    );
  }

});

const AlertCard = ({ body, createdOn }) => {
  return (
    <View style={stylesheet.alertCard}>
      <Text style={stylesheet.alertBody}>{body}</Text>
      <Text style={stylesheet.alertCreatedOn}>{moment(createdOn).fromNow()}</Text>
    </View>
  );
};

export default AlertsScreen;
