import '../setupTests';

import React from 'react';
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
  });
});
