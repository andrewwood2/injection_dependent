import { shallow } from 'enzyme';
import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { Button, Switch } from 'react-native';
import moment from 'moment';
import timekeeper from 'timekeeper';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import { HomeScreen } from '../screens/HomeScreen';
import ConfirmModal from '../screens/ConfirmModal';
import CurrentSite from '../components/CurrentSite';
import PreviousSite from '../components/PreviousSite';
import injectionsites from '../components/injectionsites';
import BodyImages from '../components/BodyImages';
import DefaultFirstInj from '../components/defaultFirstInj';

describe('Homescreen', () => {
  timekeeper.freeze(new Date(1539760000000));
  let hs;
  let mockNextInjSite;
  let mockSaveInj;
  let mockRotateNSites;
  let firstInj = new DefaultFirstInj().defaultFirstInj;

  beforeEach(() => {
    mockNextInjSite = jest.fn();
    mockSaveInj = jest.fn();
    mockRotateNSites = jest.fn();
    hs = shallow(<HomeScreen
      saveInj={mockSaveInj}
      nextInjSite={mockNextInjSite}
      rotateNSites={mockRotateNSites}
      sites={injectionsites}
      history={[{ site: firstInj.site, time: firstInj.time }]}
    />);
  });

  describe('Recommended and Previous Site components', () => {
    it('should render the text of the suggested injection location', () => {
      const currentSite = hs.find(CurrentSite);
      expect(currentSite.length).toEqual(1);
      expect(currentSite.props().site).toEqual(injectionsites[0]);
    });
    it('should render the text of the previous injection location, with a time', () => {
      const previousSite = hs.find(PreviousSite);
      expect(previousSite.length).toEqual(1);
      expect(previousSite.props().site).toEqual(firstInj.site);
      expect(previousSite.props().time).toEqual(firstInj.time);
    });
    it('wont render a site that is not active', () => {
      const inactive = [
        { part: 'Thigh', side: 'Left', quadrant: 1, active: false, imgNum: 0 },
        { part: 'Thigh', side: 'Left', quadrant: 2, active: true, imgNum: 1 },
      ];
      hs = shallow(<HomeScreen
        rotateNSites={mockRotateNSites}
        sites={inactive}
        history={[{ site: firstInj.site, time: firstInj.time }]}
      />);
      const currentSite = hs.find(CurrentSite);
      expect(currentSite.length).toEqual(1);
      expect(mockRotateNSites.mock.calls.length).toBe(1);
      expect(currentSite.props().site).toEqual(inactive[1]);
    });
  });

  describe('handleConfirmation', () => {
    it('should call Save and Next actions', () => {
      hs.instance().handleConfirmation();
      const currentSite = hs.find(CurrentSite);
      expect(currentSite.length).toEqual(1);
      expect(mockNextInjSite.mock.calls.length).toBe(1);
      expect(mockSaveInj.mock.calls.length).toBe(1);
    });
    it('should call Save and Next actions again after pressing a second time', () => {
      hs.instance().handleConfirmation();
      hs.instance().handleConfirmation();
      const currentSite = hs.find(CurrentSite);
      expect(currentSite.length).toEqual(1);
      expect(mockNextInjSite.mock.calls.length).toBe(2);
      expect(mockSaveInj.mock.calls.length).toBe(2);
    });
  });

  describe('Switch', () => {
    it('will be to Short by default', () => {
      hs.instance().handleConfirmation();
      expect(mockSaveInj.mock.calls.length).toBe(1);
      expect(mockSaveInj).toHaveBeenCalledWith({
        site: injectionsites[0],
        time: Date.now(),
        dbsync: false,
        medType: 'Short',
      });
    });
    it('should change whether injections are saved with long or short med type', () => {
      hs.find(Switch).simulate('valueChange');
      hs.instance().handleConfirmation();
      expect(mockSaveInj.mock.calls.length).toBe(1);
      expect(mockSaveInj).toHaveBeenCalledWith({
        site: injectionsites[0],
        time: Date.now(),
        dbsync: false,
        medType: 'Long',
      });
    });
    // it('should change whether injections are saved with long or short med type', () => {
    //   hs.find(Switch).simulate('valueChange')
    //   hs.find(Switch).simulate('valueChange')
    //   hs.instance().handleConfirmation();
    //   expect(mockSaveInj.mock.calls.length).toBe(1)
    //   expect(mockSaveInj).toHaveBeenCalledWith({
    //     site: injectionsites[0],
    //     time: moment(),
    //     dbsync: false,
    //     medType: 'Short'
    //   })
    // })
  });

  describe('Passes right props to Modal', () => {
    it('should give handleConfirmation as a prop to Modal', () => {
      const cM = hs.find(ConfirmModal);
      expect(cM.props().site).toEqual(injectionsites[0]);
      expect(cM.props().onConfirmation()).toEqual(hs.instance().handleConfirmation());
    });
  });

  describe('Skip on swipe', () => {
    it('should call the Next action on swipeLeft', () => {
      hs.find(GestureRecognizer).simulate('swipeLeft');
      const currentSite = hs.find(CurrentSite);
      expect(mockRotateNSites.mock.calls.length).toBe(1);
      expect(mockRotateNSites).toHaveBeenCalledWith(4);
    });
    it('should call the Next action on swipeRight', () => {
      hs.find(GestureRecognizer).simulate('swipeRight');
      const currentSite = hs.find(CurrentSite);
      expect(mockRotateNSites.mock.calls.length).toBe(1);
      expect(mockRotateNSites).toHaveBeenCalledWith(4);
    });
  });
});
