import AbstractSubscription from './abstract-subscription';

// TODO - share with confirm
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
          onItemUpdate(opu);
        } catch(err) {
          console.error(`Failed parse opu: ${err}`);
        }
      },
      false
    );
  }
}
