// TODO - use sessionStore?
export default class LsClient {
  connect(endpoint, accountId, cst, xst) {
    const client = new Lightstreamer.LightstreamerClient(endpoint);
    const connectionDetails = client.connectionDetails;

    connectionDetails.setUser(accountId);
    connectionDetails.setPassword(`CST-${cst}|XST-${xst}`);

    client.addListener({
      onStatusChange: function(status) {
        console.log(`Lightstreamer status: ${status}`);
      },
    });

    client.connect();
    this._client = client;
  }

  subscribe(subscriptionStr, fids, mode, onItemUpdate, withSnapshot=true) {
    const subscription = new Lightstreamer.Subscription(
      mode,
      subscriptionStr,
      fids
    );

    subscription.addListener({
      onSubscription() {
        console.log(`subscribed: ${subscriptionStr}`);
      },
      onUnsubscription() {
        console.log(`unsubscribed: ${subscriptionStr}`);
      },
      onSubscriptionError(code, msg) {
        console.log(`subscription failure: ${code} - ${message}`);
      },
      onItemUpdate,
    });

    if (!withSnapshot) {
      subscription.setRequestedSnapshot('no');
    }

    this._client.subscribe(subscription);

    return subscription;
  }

  unsubscribe(subscription) {
    this._client.unsubscribe(subscription);
  }

  disconnect() {
    this._client.disconnect();
  }
}
