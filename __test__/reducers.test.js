import reducer from '../redux/reducers/index'
import injectionsites from '../components/injectionsites';
import DefaultFirstInj from '../components/defaultFirstInj';
import moment from 'moment';
import timekeeper from 'timekeeper';

describe('sites reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}).sites).toEqual(injectionsites)
  })
  it('should handle sites-next-injection-site', () => {
    expect(
      reducer({
        sites: [1,2,3,4,5]
      }, {
        type: 'sites-next-injection-site'
      }).sites
    ).toEqual([2,3,4,5,1])
  })
  it('should handle sites-rotate-n-sites', () => {
    expect(
      reducer({
        sites: [1,2,3,4,5]
      }, {
        type: 'sites-rotate-n-sites',
        number: 3
      }).sites
    ).toEqual([4,5,1,2,3])
  })
  it('should handle site reset', () => {
    expect(reducer({
      sites: [3,4,5,1,2]
    }, {
      type: 'sites-reset-defaults'
    }).sites).toEqual(injectionsites)
  })

  it('should handle site checked for one part', () => {
    expect(
      reducer({
        sites: [{part: 3, active: true}]
      }, {
        type: 'sites-checked',
        part: 3,
        previousCheckedStatus: true
      }).sites
    ).toEqual([{part: 3, active: false}])
  })

  it('should handle site checked for several parts', () => {
    expect(
      reducer({
        sites: [{part: 3, active: true}, {part: 3, active: true}, {part: 1, active: true}],
      }, {
        type: 'sites-checked',
        part: 3,
        previousCheckedStatus: true
      }).sites
    ).toEqual([{part: 3, active: false},
              {part: 3, active: false},
              {part: 1, active: true}])
  })
})

describe('history reducer', () => {
  timekeeper.freeze(new Date(1539760000000))

  it('should return the initial state', () => {
    expect(reducer(undefined, {}).history).toEqual([new DefaultFirstInj().defaultFirstInj])
  })
  it('should handle history-save-injection', () => {
    expect(
      reducer({
        history: [1]
      }, {
        type: 'history-save-injection',
        item: 2
      }).history
    ).toEqual([1, 2])
  })
  it('should handle history reset', () => {
    expect(reducer({
      history: [1]
    }, {
      type: 'history-reset-defaults'
    }).history).toEqual([new DefaultFirstInj().defaultFirstInj])
  })

  it('changes history sync to true', () => {
    expect(reducer({
      history: [{ site: 1, dbsync: false }, { site: 2, dbsync: false }],
    }, {
      type: 'history-sync-status',
    }).history).toEqual([{ site:1, dbsync: true }, { site: 2, dbsync: true }])

  });
})

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}).token).toEqual(null)
  })
  it('should handle token-save', () => {
    expect(
      reducer({
        token: null
      }, {
        type: 'token-save',
        token: '12345'
      }).token
    ).toEqual('12345')
  })
  it('should handle token-destroy', () => {
    expect(
      reducer({
        token: '12345'
      }, {
        type: 'token-destroy',
      }).token
    ).toEqual(null)
  })
})
