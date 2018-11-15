import '../setupTests';

import React from 'react';
import { Alert, Modal } from 'react-native';
import SignUpModal from '../components/SignUpModal';
import Styles from '../components/Styles';

describe('SignUp', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignUpModal />);
  });

  describe('#changeVisibility', () => {
    it('changes the visibility', () => {
      const initialState = wrapper.state().modalVisible;
      wrapper.instance().changeVisibility();
      const nextState = wrapper.state().modalVisible;
      expect(initialState === nextState).toBe(false);
    });
  });

  describe('Modal', () => {
    it('throws an Alert on Android devices when closed', () => {
      Alert.alert = jest.fn();
      const modal = wrapper.find(Modal);
      modal.simulate('requestClose');
      expect(Alert.alert).toHaveBeenCalledWith('Modal closed');
    });
  });

  describe('When not visible', () => {
    it('Renders a button to sign up', () => {
      expect(wrapper.find('#signup').length).toEqual(1);
    });

    describe('Sign Up button', () => {
      it('Should have buttonPress styling', () => {
        const signUp = wrapper.find('#signup');
        expect(signUp.props().style).toEqual(
          Styles.buttonPress,
        );
      });
    });
  });

  describe('When Sign Up pressed & modalVisible', () => {
    beforeEach(() => {
      wrapper.find('#signup').simulate('press');
    });

    it('Renders a username field', () => {
      expect(wrapper.find('#username').length).toEqual(1);
    });

    it('Renders an email fiald', () => {
      expect(wrapper.find('#email').length).toEqual(1);
    });

    it('Renders a password field', () => {
      expect(wrapper.find('#password').length).toEqual(1);
    });

    it('Renders a password confirmation field', () => {
      expect(wrapper.find('#confirm-password').length).toEqual(1);
    });

    it('Renders a button to cancel', () => {
      expect(wrapper.find('#cancel').length).toEqual(1);
    });
  });

  describe('Cancel button', () => {
    it('renders modal not visible when pressed', () => {
      wrapper.find('#signup').simulate('press');
      wrapper.find('#cancel').simulate('press');
      expect(wrapper.state().modalVisible).toEqual(false);
    });

    it('Should have button styling', () => {
      const cancel = wrapper.find('#cancel');
      expect(cancel.props().style).toEqual(Styles.button);
    });
  });
});
