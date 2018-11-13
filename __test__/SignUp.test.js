import '../setupTests';

import React from 'react';
import SignUp from '../components/SignUp';

describe('SignUp', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignUp />);
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
});
