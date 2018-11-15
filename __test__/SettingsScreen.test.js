import { shallow } from 'enzyme';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { SettingsScreen } from '../screens/SettingsScreen';
import injectionsites from '../components/injectionsites';
import Styles from '../components/Styles';

describe('SettingsScreen', () => {
  let app;
  let mockCheckSites;

  beforeEach(() => {
    mockCheckSites = jest.fn();
    app = shallow(<SettingsScreen
      checkSites={mockCheckSites}
      sites={injectionsites}
    />);
  });

  it('checks the existence of a checkbox', () => {
    const checkbox = app.find('#Thigh');
    expect(checkbox.length).toEqual(1);
    expect(checkbox.props().checked).toEqual(true);
  });

  it('changes the state for arms checkbox', () => {
    let checkbox = app.find('#Arm');
    checkbox.simulate('press');
    checkbox = app.find('#Arm');
    expect(checkbox.length).toEqual(1);
    expect(mockCheckSites.mock.calls.length).toBe(1);
  });

  it('Renders two TouchableHighlights in total', () => {
    expect(app.find(TouchableHighlight).length).toEqual(2);
  });

  describe('Sign Up', () => {
    it('Renders a TH to sign up', () => {
      expect(app.find('#signup').length).toEqual(1);
    });

    it('Should have buttonPress styling', () => {
      const signup = app.find('#signup');
      expect(signup.props().style).toEqual(
        Styles.buttonPress,
      );
    });

    it('calls #changeSignupVisibile when pressed', () => {
      const changeSignupVis = jest.fn();
      const mockScreen = shallow(<SettingsScreen
        checkSites={mockCheckSites}
        sites={injectionsites}
        changeSignupVisibile={changeSignupVis()}
      />);
      mockScreen.find('#signup').simulate('press');
      expect(changeSignupVis).toHaveBeenCalled();
    });
  });

  describe('Log In', () => {
    it('Renders a TH to log in', () => {
      expect(app.find('#login').length).toEqual(1);
    });

    it('Should have buttonPress styling', () => {
      const login = app.find('#login');
      expect(login.props().style).toEqual(
        Styles.buttonPress,
      );
    });

    it('calls #changeLoginVisible when pressed', () => {
      const changeLoginVis = jest.fn();
      const mockScreen = shallow(<SettingsScreen
        checkSites={mockCheckSites}
        sites={injectionsites}
        changeLoginVisible={changeLoginVis()}
      />);
      mockScreen.find('#login').simulate('press');
      expect(changeLoginVis).toHaveBeenCalled();
    });
  });
});
