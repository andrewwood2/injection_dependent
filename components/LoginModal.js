import React, { Component } from 'react';
import { TouchableHighight, View } from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View>
        <View>
          <TouchableHighight
            id="login"
          >
            Log In
          </TouchableHighight>
        </View>
      </View>
    );
  }
}
