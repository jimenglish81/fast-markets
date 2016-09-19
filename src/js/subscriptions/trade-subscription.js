import AbstractSubscription from './abstract-subscription';

export default class TradeSubscription extends AbstractSubscription {

  subscribe(accountId, onItemUpdate) {
    this.unsubscribe();
    let isFirst = true;
    this.subscription = this.lsClient.subscribe(
      `TRADE:${accountId}`,
      ['CONFIRMS'],
      'DISTINCT',
      (itemUpdate) => {
        if (isFirst) {
          isFirst = false;
          return;
        }
        try {
          const confirm = JSON.parse(itemUpdate.getValue('CONFIRMS'));
          onItemUpdate(confirm);
        } catch(err) {
          console.error(`Failed parse confirm: ${err}`);
        }
      },
      false
    );
  }
}
