export default class MarketSubscription {
  constructor(lsClient, fids, schema) {
    this.lsClient = lsClient;
    this.fids = fids;
    this.schema = schema;
  }

  subscribe(epics, onItemUpdate) {
    const subscriptionStr = epics.map((epic) => `MARKET:${epic}`);

    this.unsubscribe();
    this.subscription = this.lsClient.subscribe(
      subscriptionStr,
      this.fids,
      'MERGE',
      (itemUpdate) => {
        const [,epic] = itemUpdate.getItemName().split(':');
        let updates = {};

        itemUpdate.forEachChangedField((fid, pos, value) => {
          const key = this.schema[pos-1];
          updates[key] = value;
        });

        onItemUpdate(epic, updates);
      }
    );
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
