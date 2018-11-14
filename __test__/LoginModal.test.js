import '../setupTests';

import React from 'react';
import { Alert, Modal } from 'react-native';
import LoginModal from '../components/LoginModal';

describe('LoginModal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LoginModal />);
  });

  it('Renders a button to login', () => {
    expect(wrapper.find('#login').length).toEqual(1);
  });

  describe('When Log In pressed & modalVisible', () => {
    beforeEach(() => {
      wrapper.find('#login').simulate('press');
    });

    it('Renders a username field', () => {
      expect(wrapper.find('#username').length).toEqual(1);
    });

    it('Renders a password field', () => {
      expect(wrapper.find('#password').length).toEqual(1);
    });

    it('Renders a button to cancel', () => {
      expect(wrapper.find('#cancel').length).toEqual(1);
    });

    it('calls #changeVisibility when pressed', () => {
      const mockChangeVisibility = jest.fn();
      const mockLogin = shallow(<LoginModal changeVisibility={mockChangeVisibility()} />);
      mockLogin.find('#login').simulate('pressIn');
      mockLogin.find('#login').simulate('pressOut');
      expect(mockChangeVisibility).toHaveBeenCalled();
    });
  });

  describe('Cancel button', () => {
    it('changes visibility when pressed', () => {
      wrapper.find('#login').simulate('press');
      wrapper.find('#cancel').simulate('press');
      expect(wrapper.state().modalVisible).toBe(false);
    });
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
    it('Renders an alert when closed', () => {
      Alert.alert = jest.fn();
      const modal = wrapper.find(Modal);
      modal.simulate('requestClose');
      expect(Alert.alert).toHaveBeenCalledWith('Modal closed');
    });
  });
});
