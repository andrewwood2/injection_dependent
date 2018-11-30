import injectionsites from './injectionsites';

export default class DefaultFirstInj {
  constructor() {
    this.defaultFirstInj = {
      site: {
        part: 'injections appear',
        side: 'Previous',
        quadrant: 'here',
      },
      time: Date.now(),
      dbsync: true,
      medType: 'Short',
    }
  }
}
