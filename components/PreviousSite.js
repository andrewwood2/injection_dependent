import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment'

class PreviousSite extends Component {
  render() {
    return (
      <View style={{ marginBottom: 10 }}>
        <Text>
          <Text style={styles.previous}>Previous: </Text> <Text id="site" style={styles.site}>{ this.props.site.side } { this.props.site.part } { this.props.site.quadrant }{'\n'}</Text>
          <Text style={styles.previous}>When:       </Text><Text id="time" style={styles.site}>{moment.unix(parseInt(this.props.time, 10)/1000).calendar()}</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  previous: {
  },
  site: {
  },
  timeText: {
    marginLeft: 30,
  },
});

export default PreviousSite;
