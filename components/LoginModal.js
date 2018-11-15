import React, { Component } from 'react';
import { Alert, Modal, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Styles from './Styles';

export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loginPressStatus: false,
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
              textContentType="username"
            />

            <TextInput
              secureTextEntry
              id="password"
              placeholder="Password"
              textContentType="password"
            />
          </View>
          <View>
            <TouchableHighlight
              id="cancel"
              style={
                this.state.cancelPressStatus
                  ? Styles.styles.buttonPress
                  : Styles.styles.button
              }
              onPress={() => {
                this.changeVisibility();
              }}
            >
              <Text
                style={Styles.styles.welcome}
              >
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <View>
          <TouchableHighlight
            id="login"
            style={
              this.state.loginPressStatus
                ? Styles.styles.button
                : Styles.styles.buttonPress
            }
            onPress={() => {
              this.changeVisibility();
            }
          }
          >
            <Text
              style={Styles.styles.welcome}
            >
              Log In
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
