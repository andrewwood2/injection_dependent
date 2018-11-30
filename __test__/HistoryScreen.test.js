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
  let mockSaveInj

  beforeEach(() => {
    firstInj.dbsync = false
    history = [firstInj]
    mockUpdateSyncStatus = jest.fn()
    mockResetHistory = jest.fn()
    mockSaveInj = jest.fn()
  });

  describe('When not logged in', () => {
    beforeEach(() => {
      historyScreen = shallow(
        <HistoryScreen
          history = {history}
          updateSyncStatus = {mockUpdateSyncStatus}
          resetHistory = {mockResetHistory}
          token={null}
        />
      );
    })

    describe('HistoryTable', () => {
      it('renders a table component', () => {
        expect(historyScreen.containsMatchingElement(<HistoryTable />)).toEqual(true);
      });
      it('passes the Table the history data', () => {
        let table = historyScreen.find(HistoryTable)
        expect(table.props().history).toEqual(history)
      });
    });

    it('Shows a polite message to log in', () => {
      expect(historyScreen.find(Text).dive().text()).toEqual('Sign in on the settings page to save data to the cloud')
    });

    it('Doesnt show the save and load buttons', () => {
      expect(historyScreen.find('#load').length).toEqual(0)
    });

    describe('Delete', () => {
      it('deletes data locally', () => {
        historyScreen.find('#delete').simulate('press')
        expect(mockResetHistory.mock.calls.length).toEqual(1)
      });
      it('wont call db if no username has been provided', () => {
        historyScreen.find('#delete').simulate('press')
        expect(mockAxios.delete.mock.calls.length).toEqual(0)
      });
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      historyScreen = shallow(
        <HistoryScreen
          history = {history}
          updateSyncStatus = {mockUpdateSyncStatus}
          resetHistory = {mockResetHistory}
          saveInj = {mockSaveInj}
          token={token}
        />
      );
    })

    describe('DB save and load', () => {
      beforeEach(() => {
        jest.setMock('axios', mockAxios);
      })
      describe('Save', () => {
        it('saveData calls axios post', () => {
          historyScreen.find('#save').simulate('press')
          expect(mockAxios.post).toHaveBeenCalledWith(
            `${DB_ADDRESS}/injections`,
            {
              injection: {
                site: JSON.stringify(firstInj.site),
                time: String(firstInj.time),
                medtype: firstInj.medType
              }
            },
            {
              headers: { 'Authorization':token }
            }
          )
          expect(mockUpdateSyncStatus.mock.calls.length).toBe(1)
        });
      });

      describe('Load', () => {
        it('loadData calls axios get', () => {
          historyScreen.find('#load').simulate('press')
          expect(mockAxios.get).toHaveBeenCalledWith(
            `${DB_ADDRESS}/injections`,
            {
              headers: { 'Authorization':token }
            }
          )
          expect(mockUpdateSyncStatus.mock.calls.length).toBe(1)
          expect(mockResetHistory.mock.calls.length).toBe(1)
        });
        it('saves all injections once promise resolved', () => {
          const spy = jest.spyOn(historyScreen.instance(), 'handleLoadedData')
          expect.assertions(1);
          return historyScreen.instance().loadData()
            .then(data => {
              expect(spy).toHaveBeenCalled()
              spy.mockRestore()
            })
        })
        it('handlesLoadedData', () => {
          const data = {returnData:[{
            "id": 5,
            "site": "{\"part\":\"Thigh\",\"side\":\"Left\",\"quadrant\":1,\"active\":true,\"imgNum\":0}",
            "time": "1539765000000.0",
            "medtype": "short",
            "created_at": "2018-11-16T12:04:45.676Z",
            "updated_at": "2018-11-16T12:04:45.676Z",
            "user_id": 7
          }]}
          historyScreen.instance().handleLoadedData(data)
          expect(mockSaveInj).toHaveBeenCalledWith({
            site: {"active": true, "imgNum": 0, "part": "Thigh", "quadrant": 1, "side": "Left"},
            time: 1539765000000.0,
            dbsync: true,
            medType: "short"
          })
        })
        it('handles multiple LoadedData', () => {
          const data = {returnData:[{
            "id": 5,
            "site": "{\"part\":\"Thigh\",\"side\":\"Left\",\"quadrant\":1,\"active\":true,\"imgNum\":0}",
            "time": "1539765000000.0",
            "medtype": "short",
            "created_at": "2018-11-16T12:04:45.676Z",
            "updated_at": "2018-11-16T12:04:45.676Z",
            "user_id": 7
          },
          {
            "id": 5,
            "site": "{\"part\":\"Thigh\",\"side\":\"Left\",\"quadrant\":2,\"active\":true,\"imgNum\":0}",
            "time": "1539766000000.0",
            "medtype": "long",
            "created_at": "2018-11-16T12:04:45.676Z",
            "updated_at": "2018-11-16T12:04:45.676Z",
            "user_id": 7
          }]}
          historyScreen.instance().handleLoadedData(data)
          expect(mockSaveInj).toHaveBeenCalledWith({
            site: {"active": true, "imgNum": 0, "part": "Thigh", "quadrant": 1, "side": "Left"},
            time: 1539765000000.0,
            dbsync: true,
            medType: "short"
          })
          expect(mockSaveInj).toHaveBeenCalledWith({
            site: {"active": true, "imgNum": 0, "part": "Thigh", "quadrant": 2, "side": "Left"},
            time: 1539766000000.0,
            dbsync: true,
            medType: "long"
          })
        })
      });

      describe('Delete', () => {
        it('calls axios delete on the users records', () => {
          historyScreen.find('#delete').simulate('press')
          expect(mockAxios.delete).toHaveBeenCalledWith(
            `${DB_ADDRESS}/injections/1`,
            {
              headers: { 'Authorization':token }
            }
          )
          expect(mockAxios.delete.mock.calls.length).toBe(1)
        });
      });
    });
  });
});
