import React, { Component } from 'react';
import { Alert, Modal, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Styles from './Styles';

export default class LoginModal extends Component {
  render() {
    return (
      <View>
        <Modal
          id="modal"
          animationType="fade"
          presentationStyle="fullScreen"
          transparent={false}
          visible
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
              id="submit"
              style={Styles.buttonPress}
            >
              <Text
                style={Styles.welcome}
              >
              Submit
              </Text>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight
              id="cancel"
              style={Styles.button}
              onPress={() => {
                this.props.hideModal();
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
      </View>
    );
  }
}
