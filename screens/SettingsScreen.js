import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { checkSites } from '../redux/actions/sites';
import injectionsites from '../components/injectionsites';
import Styles from '../components/Styles';

import SignUpModal from '../components/SignUpModal';
import LoginModal from '../components/LoginModal';

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props) {
    super(props);
    this.state = {
      isSignupVisible: false,
      loginVisibility: false,
    };
    this.signupVisibility = this.signupVisibility.bind(this);
  }

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


  signupVisibility() {
    this.setState(prevState => ({
      isSignupVisible: !prevState.isSignupVisible,
    }));
  }

  isLoginVisible() {
    this.setState(prevState => ({
      loginVisibility: !prevState.loginVisibility,
    }));
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
          <Text>
            {'\n'}
          </Text>
          <TouchableHighlight
            id="signup"
            style={Styles.buttonPress}
            onPress={() => {
              this.signupVisibility();
            }
          }
          >
            <Text
              style={Styles.welcome}
            >
              Sign Up
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            id="login"
            style={Styles.buttonPress}
            onPress={() => {
              this.isLoginVisible();
            }
          }
          >
            <Text
              style={Styles.welcome}
            >
              Log In
            </Text>
          </TouchableHighlight>
          <LoginModal />
        </View>
        <Text>
          {'\n'}
        </Text>
        {this.state.isSignupVisible && <SignUpModal hideModal={this.signupVisibility} />}
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
