import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { checkSites } from '../redux/actions/sites';
import injectionsites from '../components/injectionsites';

import SignUpModal from '../components/SignUpModal';

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  onlyUnique(self) {
    const uniqueParts = [];
    const uniqueSites = [];
    self.forEach((site, index) => {
      if (!uniqueParts.includes(site.part)) {
        uniqueParts.push(site.part);
        uniqueSites.push(site);
      }
    });
    return uniqueSites;
  }

  render() {
    return (
      <React.Fragment>
        <View>
          {
            this.onlyUnique(this.props.sites).map(cb => (
              <CheckBox
                key={cb.part}
                id={cb.part}
                title={cb.part}
                checked={cb.active}
                onPress={() => this.props.checkSites(cb.part, cb.active)}
              />
            ))
          }
        </View>
        <Text>
          {'\n'}
        </Text>
        <View>
          <SignUpModal />
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  sites: state.sites,
});

const mapDispatchToProps = dispatch => ({
  checkSites: (part, previousCheckedStatus) => { dispatch(checkSites(part, previousCheckedStatus)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
