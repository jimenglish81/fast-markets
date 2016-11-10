import AbstractSubscription from './abstract';

export default class BalanceSubscription extends AbstractSubscription {
  constructor(lsClient, fids, schema) {
    super(lsClient);
    this.fids = fids;
    this.schema = schema;
  }

  subscribe(accountId, onItemUpdate) {
    this.subscription = this.lsClient.subscribe(
      `ACCOUNT:${accountId}`,
      this.fids,
      'MERGE',
      (itemUpdate) => {
        let updates = {};

        itemUpdate.forEachChangedField((fid, pos, value) => {
          const key = this.schema[pos - 1];
          updates[key] = value;
        });

        onItemUpdate(updates);
      }
    );
  }
}
