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
});
