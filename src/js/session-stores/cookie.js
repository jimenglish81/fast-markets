export default class Cookie {

  _write(value) {
    document.cookie = `session=${encodeURIComponent(value)}`;
  }

  _read(name) {
    let value = document.cookie.match(new RegExp(`${name}=([^;]+)`)) || [];
    return decodeURIComponent(value[1] || '');
  }

  persist(data={}) {
    try {
      const json = JSON.stringify(data);
      this._write(json);
    } catch(err) {
      console.info('CookieStore: value could not be persisted.');
    }
  }

  restore() {
    let data = this._read('session');
    let json = {};
    try {
      json = JSON.parse(data);
    } catch(err) {
      console.info('CookieStore: value could not be restored.');
    }
    return json;
  }

  clear() {
    this._write(null);
  }
}
