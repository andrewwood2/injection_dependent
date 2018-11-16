import { shallow } from 'enzyme';
import { Text } from 'react-native';
import React from 'react';
import { createMockStore } from 'redux-test-utils';
import HistoryScreen from '../screens/HistoryScreen';
import HistoryTable from '../components/HistoryTable';
import { resetHistory } from '../redux/actions/history';
import DefaultFirstInj from '../components/defaultFirstInj'

describe('ConnectedHistoryScreen', () => {
  let historyscreen;
  let store
  let firstInj = new DefaultFirstInj().defaultFirstInj;
  const token = '12345'

  beforeEach(() => {
    store = createMockStore({
      history: [{ site: firstInj.site, time: firstInj.time }],
      token: token
    });
    historyscreen = shallow(<HistoryScreen store={store} />);
  });

  it('adds store history to props', () => {
    expect(historyscreen.props().history[0].site.part).toEqual('injections appear')
  });

  it('adds store token to props', () => {
    expect(historyscreen.props().token).toEqual(token)
  })

  it('adds saveInj action to props', () => {
    historyscreen.props().saveInj('test')
    expect(store.getActions()).toEqual([{'item': 'test', 'type': 'history-save-injection'}]);
  })

  it('adds updateSyncStatus action to props', () => {
    historyscreen.props().updateSyncStatus()
    expect(store.getActions()).toEqual([{'type': 'history-sync-status'}]);
  })

  it('adds resetHistory action to props', () => {
    historyscreen.props().resetHistory()
    expect(store.getActions()).toEqual([{'type': 'history-reset-defaults'}]);
  })
});
