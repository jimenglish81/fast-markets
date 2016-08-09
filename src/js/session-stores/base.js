export default class Base {
  constructor() {
  }

  persist() {
    return RSVP.reject();
  }

  restore() {
    return RSVP.reject();
  }

  clear() {
    return RSVP.reject();
  }
}
