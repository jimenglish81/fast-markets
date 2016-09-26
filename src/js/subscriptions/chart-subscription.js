import AbstractSubscription from './abstract-subscription';

export default class ChartSubscription extends AbstractSubscription {

  subscribe(epic, onItemUpdate) {
    const schema = ['price', 'timestamp'];

    this.unsubscribe();
    this.subscription = this.lsClient.subscribe(
      `CHART:${epic}:TICK`,
      ['BID', 'UTM'],
      'DISTINCT',
      (itemUpdate) => {
        let updates = {};

        itemUpdate.forEachChangedField((fid, pos, value) => {
          const key = schema[pos - 1];
          updates[key] = value;
        });
        if (updates.timestamp !== null && updates.price !== null) {
          onItemUpdate(updates);
        }
      }
    );
  }
}
