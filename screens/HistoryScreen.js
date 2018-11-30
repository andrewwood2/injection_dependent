import React from 'react';
import { ScrollView, StyleSheet, Button, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import moment from 'moment';

import { connect } from 'react-redux';
import HistoryTable from '../components/HistoryTable';
import { saveInj, resetHistory, updateSyncStatus } from '../redux/actions/history';

const DB_ADDRESS = 'https://injectiondependent.herokuapp.com'
// const DB_ADDRESS = 'http://localhost:9292'

export class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'History',
  };

  prepareLoad() {
    this.saveData()
    this.props.resetHistory()

    //Note: should really have loadData as a callback of saveData
    this.loadData()

  }

  saveData() {
    this.props.history.forEach((inj) => {
      // console.log(String(inj.time)===inj.time);
      if (inj.dbsync === false) {
        axios.post(
          `${DB_ADDRESS}/injections`,
          {
            injection: {
              site: JSON.stringify(inj.site),
              time: String(inj.time),
              medtype: inj.medType
            }
          },
          {
            headers: {
              'Authorization':this.props.token,
              // 'Content-Type':'application/json'
            }
          }
        )
        .then()
        .catch(error => {
          console.log(error)
        })
      }
    });
    this.props.updateSyncStatus();
  }

  loadData() {
    return axios.get(`${DB_ADDRESS}/injections`,
    {
      headers: { 'Authorization':this.props.token }
    })
    .then(data => {
      this.handleLoadedData(data)
    })
    .catch(error => {
      console.log(error);
    })
  }

  handleLoadedData(data) {
    for (i in data) { // this loops over all properties of an object. Probably should change
      data[i].forEach((inj) => {
        this.props.saveInj({
          site: JSON.parse(inj.site),
          time: parseInt(inj.time),
          dbsync: true,
          medType: inj.medtype
        })
      })
    }
  }

  deleteAllData() {
    if (this.props.token) {
      axios.delete(
        `${DB_ADDRESS}/injections/1`,
        { headers: { 'Authorization':this.props.token } }
      )
    }
    this.props.resetHistory()
  }

  buttonsIfSignedIn() {
    if (this.props.token) {
      return (
        <View>
          <Button
            title={'Load'}
            id={'load'}
            onPress={ () => {
              this.prepareLoad()
            }}
          />
          <Button
            title={'Save'}
            id={'save'}
            onPress={() => this.saveData()}
          />
        </View>
      )
    } else {
      return (
        <Text>Sign in on the settings page to save data to the cloud</Text>
      )
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <HistoryTable history={this.props.history} />
        {this.buttonsIfSignedIn()}
        <Button
          title={'Delete all'}
          id={'delete'}
          onPress={() => this.deleteAllData()}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});


const mapStateToProps = (state, ownProps) => ({
  history: state.history,
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  saveInj: (inj) => { dispatch(saveInj(inj)); },
  updateSyncStatus: () => { dispatch(updateSyncStatus()); },
  resetHistory: () => { dispatch(resetHistory()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
