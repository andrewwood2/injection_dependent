import injectionsites from './injectionsites';

export default class DefaultFirstInj {
  constructor() {
    this.defaultFirstInj = {
      site: injectionsites[injectionsites.length - 1],
      time: Date.now(),
      dbsync: true,
      medType: 'Short',
    }
  }
}
