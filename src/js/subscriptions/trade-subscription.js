import AbstractSubscription from './abstract-subscription';

export default class TradeSubscription extends AbstractSubscription {

  subscribe(accountId, onItemUpdate) {
    this.unsubscribe();
    this.subscription = this.lsClient.subscribe(
      `TRADE:${accountId}`,
      ['CONFIRMS'],
      'DISTINCT',
      (itemUpdate) => {
        try {
          const confirm = JSON.parse(itemUpdate.getValue('CONFIRMS'));
          onItemUpdate(confirm);
        } catch(err) {
          console.error(`Failed parse confirm: ${err}`);
        }
      }
    );
  }
}
