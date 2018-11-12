import { shallow } from 'enzyme';
import React from 'react';
import moment from 'moment';
import timekeeper from 'timekeeper';
import PreviousSite from '../components/PreviousSite';
import injectionsites from "../components/injectionsites";
import DefaultFirstInj from "../components/defaultFirstInj"

describe('PreviousSite', () => {
  timekeeper.freeze(new Date(1539760000000))
  let inj
  let app
  beforeEach(() => {
    inj = new DefaultFirstInj().defaultFirstInj
    app = shallow(<PreviousSite site={inj.site} time={inj.time}/>);
  })

  it('renders text of previous site location and time', () => {
    const text = app
      .find('#site')
      .dive()
      .text();
    expect(text).toEqual('Right Buttock 4\n');
  });

  it('renders the time of the last injection', () => {
    const calTime = moment().calendar();
    const text = app
      .find('#time')
      .dive()
      .text();
    expect(text).toEqual(calTime);
  });
});
