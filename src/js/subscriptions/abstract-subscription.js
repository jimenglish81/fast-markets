export default class AbstractSubscription {
  constructor(lsClient) {
    this.lsClient = lsClient;
    this.subscription = null;
  }

  subscribe(epic, onItemUpdate) {
    throw new Error(`AbstractSubscription: 'subscribe' must be implemented.`);
  }

  unsubscribe() {
    if (this.subscription) {
      this.lsClient.unsubscribe(this.subscription);
      this.subscription = null;
    }
  }

  destroy() {
    this.unsubscribe();
    this.lsClient = null;
  }
}
