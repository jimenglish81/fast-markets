export class MockLightstreamer {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.connectionDetails = {
      setUser(user) {
        this.user = user;
      },
      setPassword(password) {
        this.password = password;
      },
    };

    this.addListener = () => null;
    this.connect = () => this.status = 'CONNECTED';
    this.disconnect = () =>  this.status = 'DISCONNECTED';
    this.subscribe = () => null;
    this.unsubscribe = () => null;
  }
}

export class MockSubscription {
  constructor(mode, subscriptionStr, fids) {
    this.mode = mode;
    this.subscriptionStr = subscriptionStr;
    this.fids = fids;
    this.requestedSnapshot = 'yes';

    this.addListener = () => null;
    this.setRequestedSnapshot = (requestedSnapshot) => this.requestedSnapshot = requestedSnapshot;
    this.setRequestedMaxFrequency  = (maxFrequency) => this.maxFrequency = maxFrequency;
  }
}
