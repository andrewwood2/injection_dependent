import React, { Component } from 'react';
import { Alert, Modal, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Styles from './Styles';

export default class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
            <TouchableHighlight
              id="cancel"
              onPress={() => {
                this.changeVisibility();
              }}
            >
              <Text>
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <View>
          <TouchableHighlight
            id="signup"
            onPress={() => {
              this.changeVisibility();
            }
          }
          >
            <Text>
              Sign Up
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
