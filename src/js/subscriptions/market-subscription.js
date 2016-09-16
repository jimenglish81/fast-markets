import AbstractSubscription from './abstract-subscription';

export default class MarketSubscription extends AbstractSubscription {
  constructor(lsClient, fids, schema) {
    super(lsClient);
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
          const key = this.schema[pos - 1];
          updates[key] = value;
        });

        onItemUpdate(epic, updates);
      }
    );
  }
}
