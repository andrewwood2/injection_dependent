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

  describe('When modalVisible', () => {
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
    it('Should have button styling', () => {
      const cancel = wrapper.find('#cancel');
      expect(cancel.props().style).toEqual(Styles.button);
    });

    it('calls #hideModal when called', () => {
      const mockHideModal = jest.fn();
      const mockSignup = shallow(<SignUpModal hideModal={mockHideModal} />);
      mockSignup.find('#cancel').simulate('press');
      expect(mockHideModal).toHaveBeenCalled();
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
});
