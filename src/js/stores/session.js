export default class Session {
  read() {
    return this.session || {};
  }

  write(session) {
    this.session = session;
  }
}
