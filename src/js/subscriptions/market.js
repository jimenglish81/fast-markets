import AbstractSubscription from './abstract';

export default class MarketSubscription extends AbstractSubscription {

  subscribe(epics, onItemUpdate) {
    const schema = ['marketStatus', 'strike', 'odds'];
    const fidsToParse = ['STRIKE_PRICE', 'ODDS'];
    const subscriptionStr = epics.map((epic) => `MARKET:${epic}`);

    this.unsubscribe();
    this.subscription = this.lsClient.subscribe(
      subscriptionStr,
      ['MARKET_STATE', 'STRIKE_PRICE', 'ODDS'],
      'MERGE',
      (itemUpdate) => {
        const [,epic] = itemUpdate.getItemName().split(':');
        let updates = {};

        itemUpdate.forEachChangedField((fid, pos, value) => {
          const key = schema[pos - 1];
          if (value !== null) {
            updates[key] = fidsToParse.includes(fid) ? parseFloat(value) : value;
          }
        });

        onItemUpdate(epic, updates);
      },
      3
    );
  }
}
