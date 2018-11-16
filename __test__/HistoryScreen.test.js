import { shallow } from 'enzyme';
import { Text, Button, TextInput } from 'react-native';
import React from 'react';
import timekeeper from 'timekeeper';

import { HistoryScreen } from '../screens/HistoryScreen';
import HistoryTable from '../components/HistoryTable';
import mockAxios from '../__mocks__/axios'
import DefaultFirstInj from '../components/defaultFirstInj'

describe('HistoryScreen', () => {
  timekeeper.freeze(new Date(1539760000000))
  let firstInj = new DefaultFirstInj().defaultFirstInj
  const DB_ADDRESS = 'https://injectiondependent.herokuapp.com'
  // const DB_ADDRESS = 'http://localhost:9292'
  const token = 12345
  let history
  let historyScreen;
  let mockUpdateSyncStatus
  let mockResetHistory

  beforeEach(() => {
    firstInj.dbsync = false
    history = [firstInj]
    mockUpdateSyncStatus = jest.fn()
    mockResetHistory = jest.fn()
    historyScreen = shallow(
      <HistoryScreen
        history = {history}
        updateSyncStatus = {mockUpdateSyncStatus}
        resetHistory = {mockResetHistory}
        token = {token}
      />
    );
  });

  describe('HistoryTable', () => {
    it('renders a table component', () => {
      expect(historyScreen.containsMatchingElement(<HistoryTable />)).toEqual(true);
    });
    it('passes the Table the history data', () => {
      let table = historyScreen.find(HistoryTable)
      expect(table.props().history).toEqual(history)
    })
  });

  describe('Username', () => {
    it('should have a text label', () => {
      expect(historyScreen.find(Text).dive().text()).toEqual('Username:')
    })

    it('should be able to enter user name in a text box', () => {
      userInput = historyScreen.find(TextInput)
      userInput.simulate('changeText', 'Bob')
      expect(historyScreen.state().user_id).toEqual('Bob')
    })
  })

  describe('DB save and load', () => {
    beforeEach(() => {
      jest.setMock('axios', mockAxios);
    })
    describe('Save', () => {
      it('wont save if no username has been provided', () => {
        historyScreen.find('#save').simulate('press')
        expect(mockAxios.post.mock.calls.length).toEqual(0)
      })
      it('changes placeholder text if no username has been provided', () => {
        historyScreen.find('#save').simulate('press')
        userInput = historyScreen.find(TextInput)
        expect(userInput.props().placeholder).toEqual('Change me down here')
      })
      it('saveData calls axios post', () => {
        userInput = historyScreen.find(TextInput)
        userInput.simulate('changeText', 'Bob')
        historyScreen.find('#save').simulate('press')
        expect(mockAxios.post).toHaveBeenCalledWith(
          `${DB_ADDRESS}/injections`,
          {
            injection: {
              user_id: 'Bob',
              site: JSON.stringify(firstInj.site),
              time: firstInj.time,
              medtype: firstInj.medType
            }
          },
          {
            headers: { 'Authorization':token }
          }
        )
        expect(mockUpdateSyncStatus.mock.calls.length).toBe(1)
      })
    })

    describe('Load', () => {
      it('wont load if no username has been provided', () => {
        historyScreen.find('#load').simulate('press')
        expect(mockAxios.get.mock.calls.length).toEqual(0)
      })
      it('changes placeholder text if no username has been provided', () => {
        historyScreen.find('#load').simulate('press')
        userInput = historyScreen.find(TextInput)
        expect(userInput.props().placeholder).toEqual('Change me down here')
      })
      it('loadData calls axios get', () => {
        userInput = historyScreen.find(TextInput)
        userInput.simulate('changeText', 'Bob')
        historyScreen.find('#load').simulate('press')
        expect(mockAxios.get).toHaveBeenCalledWith(
          `${DB_ADDRESS}/injections?user_id=Bob`,
          {
            headers: { 'Authorization':token }
          }
        )
        expect(mockUpdateSyncStatus.mock.calls.length).toBe(1)
        expect(mockResetHistory.mock.calls.length).toBe(1)
      })
    })

    describe('Delete', () => {
      it('deletes data locally', () => {
        historyScreen.find('#delete').simulate('press')
        expect(mockResetHistory.mock.calls.length).toEqual(1)
      })
      it('wont call db if no username has been provided', () => {
        historyScreen.find('#delete').simulate('press')
        expect(mockAxios.delete.mock.calls.length).toEqual(0)
      })
      it('calls axios delete on the users records', () => {
        userInput = historyScreen.find(TextInput)
        userInput.simulate('changeText', 'Bob')
        historyScreen.find('#delete').simulate('press')
        expect(mockAxios.delete).toHaveBeenCalledWith(
          `${DB_ADDRESS}/injections/1?user_id=Bob`,
          {
            headers: { 'Authorization':token }
          }
        )
        expect(mockAxios.delete.mock.calls.length).toBe(1)
      })
    })
  });
});
