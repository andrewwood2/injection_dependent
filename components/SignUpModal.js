import React, { Component } from 'react';
import { Alert, Modal, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          presentationStyle="fullScreen"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            // this is for Android
            // Alert.alert('Modal has been closed.');
          }}
        >
          <View>
            <TextInput
              id="username"
              placeholder="User Name"
            />

            <TextInput
              id="password"
              placeholder="Password"
            />

            <TextInput
              id="password-confirmation"
              placeholder="Confirm Password"
            />
          </View>
          <View>
            <TouchableHighlight id="signup">
              <Text>
                Sign Up
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}
