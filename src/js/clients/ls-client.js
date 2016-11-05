/**
 * Client for connecting to Lightstreamer.
 */
export default class LsClient {

  /**
   * Connect to underlying LS client.
   * @param {string} endpoint LS endpoint to contact.
   * @param {string} accountId Active account of user.
   * @param {string} cst For authenticating.
   * @param {string} xst For authenticating.
   */
  connect(endpoint, accountId, cst, xst) {
    const client = new Lightstreamer.LightstreamerClient(endpoint);
    const connectionDetails = client.connectionDetails;

    connectionDetails.setUser(accountId);
    connectionDetails.setPassword(`CST-${cst}|XST-${xst}`);

    /* istanbul ignore next */
    client.addListener({
      onStatusChange: function(status) {
        console.log(`Lightstreamer status: ${status}`);
      },
    });

    client.connect();
    this.client = client;
  }

  /**
   * Unsubscribe for supplied subscription.
   * @param {string} subscriptionStr LS subscription string.
   * @param {string[]} fids Fields to subscribe to.
   * @param {string} mode Subscription mode.
   * @param {Function} onItemUpdate Callback function to be called with LS ItemUpdate.
   * @param {boolean} [withSnapshot=true] If snapshot should be supplied.
   * @param {number} [maxFrequency=1] Max updates per second.
   * @return {Subscription}
   */
  subscribe(subscriptionStr, fids, mode, onItemUpdate, withSnapshot=true, maxFrequency=1) {
    const subscription = new Lightstreamer.Subscription(
      mode,
      subscriptionStr,
      fids
    );

    /* istanbul ignore next */
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

    subscription.setRequestedMaxFrequency(maxFrequency);

    this.client.subscribe(subscription);

    return subscription;
  }

  /**
   * Unsubscribe for supplied subscription.
   * @param {Subscription} subscription LS subscription
   */
  unsubscribe(subscription) {
    this.client.unsubscribe(subscription);
  }

  /**
   * Disconnect to underlying LS client.
   */
  disconnect() {
    this.client.disconnect();
  }
}
