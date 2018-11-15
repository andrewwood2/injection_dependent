import React, { Component } from 'react';
import { Alert, Modal, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Styles from './Styles';

export default class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      signUpPressStatus: false,
      cancelPressStatus: false,
    };
  }

  changeVisibility() {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
    }));
  }

  render() {
    return (
      <View>
        <Modal
          id="modal"
          animationType="fade"
          presentationStyle="fullScreen"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal closed');
          }}
        >
          <View>
            <TextInput
              id="username"
              placeholder="Username"
            />

            <TextInput
              id="email"
              placeholder="Email"
              textContentType="emailAddress"
            />

            <TextInput
              secureTextEntry
              id="password"
              placeholder="Password"
            />

            <TextInput
              secureTextEntry
              id="confirm-password"
              placeholder="Confirm Password"
            />
          </View>
          <View>
            <TouchableHighlight
              id="cancel"
              style={
                this.state.cancelPressStatus
                  ? Styles.buttonPress
                  : Styles.button
              }
              onPress={() => {
                this.changeVisibility();
              }}
            >
              <Text
                style={Styles.welcome}
              >
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <View>
          <TouchableHighlight
            id="signup"
            style={
              this.state.signUpPressStatus
                ? Styles.button
                : Styles.buttonPress
            }
            onPress={() => {
              this.changeVisibility();
            }
          }
          >
            <Text
              style={Styles.welcome}
            >
              Sign Up
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}