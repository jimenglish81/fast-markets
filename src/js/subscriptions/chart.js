import AbstractSubscription from './abstract';

export default class ChartSubscription extends AbstractSubscription {

  subscribe(epic, onItemUpdate) {
    const fidsToParse = ['BID'];
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
          updates[key] = fidsToParse.includes(fid) ? parseFloat(value) : value;
        });
        if (updates.timestamp && updates.price) {
          onItemUpdate(updates);
        }
      },
      false,
      4
    );
  }
}
