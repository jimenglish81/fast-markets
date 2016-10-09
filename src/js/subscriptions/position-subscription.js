import AbstractSubscription from './abstract-subscription';

export default class PositionSubscription extends AbstractSubscription {

  subscribe(accountId, onItemUpdate) {
    this.unsubscribe();
    let isFirst = true;
    this.subscription = this.lsClient.subscribe(
      `TRADE:${accountId}`,
      ['OPU'],
      'DISTINCT',
      (itemUpdate) => {
        if (isFirst) {
          isFirst = false;
          return;
        }
        try {
          const opu = JSON.parse(itemUpdate.getValue('OPU'));
          if (opu) {
            onItemUpdate(opu);
          }
        } catch(err) {
          console.error(`Failed parse opu: ${err}`);
        }
      },
      false
    );
  }
}
