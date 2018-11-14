import React, { Component } from 'react';
import moment from 'moment';
import { Modal, Text, TouchableHighlight, View, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Styles from './Styles';
import { saveInj } from '../redux/actions/history';
import { nextInjSite, rotateNSites } from '../redux/actions/sites';

export default class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      confirmPressStatus: true,
      cancelPressStatus: true,
    };
  }

  render() {
    return (
      <View style={Styles.styles.show}>
        <Modal
          animationType="fade"
          presentationStyle="fullScreen"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            // this is for Android
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={Styles.styles.container}>
            <View>
              <Text style={{ fontSize: 20 }}>
                Confirm injection site:{'\n'}
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>
                {this.props.site.side} {this.props.site.part} {this.props.site.quadrant} {'\n'}
              </Text>
              <TouchableHighlight
                underlayColor="#A3C5CA"
                activeOpacity={1}
                id="finalConfirm"
                style={
                  this.state.confirmPressStatus
                    ? Styles.styles.buttonPress
                    : Styles.styles.button
                }
                onPressIn={() => this.setState({ confirmPressStatus: true })}
                onPressOut={() => this.setState({ confirmPressStatus: false })}
                onPress={() => {
                  this.setState({ modalVisible: !this.state.modalVisible });
                  this.props.onConfirmation();
                }}
              >
                <Text style={
                  this.state.confirmPressStatus
                    ? Styles.styles.welcomePress
                    : Styles.styles.welcome
                }
                >
                Confirm
                </Text>
              </TouchableHighlight>
              <Text>
                {'\n'}
              </Text>
              <TouchableHighlight
                underlayColor="#000066"
                activeOpacity={1}
                id="cancel"
                style={
                  this.state.cancelPressStatus
                    ? Styles.styles.button
                    : Styles.styles.buttonPress
                }
                onPressIn={() => this.setState({ cancelPressStatus: true })}
                onPressOut={() => this.setState({ cancelPressStatus: false })}
                onPress={() => {
                  this.setState({ modalVisible: !this.state.modalVisible });
                }}
              >
                <Text style={
                  this.state.cancelPressStatus
                    ? Styles.styles.welcome
                    : Styles.styles.welcomePress
               }>
                  Cancel
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          id="firstConfirm"
          style={{ marginTop: 40 }}
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        >
          <Text style={Styles.styles.text}>Confirm this site</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
