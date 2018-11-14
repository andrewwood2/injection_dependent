import '../setupTests';

import React from 'react';
import SignUpModal from '../components/SignUpModal';

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

  describe('When not visible', () => {
    it('Renders a button to sign up', () => {
      expect(wrapper.find('#signup').length).toEqual(1);
    });
  });

  describe('When Sign Up pressed & modalVisible', () => {
    beforeEach(() => {
      wrapper.find('#signup').simulate('press');
    });

    it('Renders a username field', () => {
      expect(wrapper.find('#username').length).toEqual(1);
    });

    it('Renders a password field', () => {
      expect(wrapper.find('#password').length).toEqual(1);
    });

    it('Renders a password confirmation field', () => {
      expect(wrapper.find('#password-confirmation').length).toEqual(1);
    });

    it('Renders a button to cancel', () => {
      expect(wrapper.find('#cancel').length).toEqual(1);
    });
  });
});
