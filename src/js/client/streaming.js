export default function connect(lsEndpoint, accountId, cst, xst) {
  const lsClient = new Lightstreamer.LightstreamerClient(lsEndpoint);
  const connectionDetails = lsClient.connectionDetails;

  connectionDetails.setUser(accountId);
  connectionDetails.setPassword(`CST-${cst}|XST-${xst}`);

  lsClient.addListener({
     onListenStart: function() {
        console.log('ListenStart');
     },
     onStatusChange: function(status) {
      console.log('Lightstreamer connection status:' + status);
     }
  });

  lsClient.connect();




  var subscription = new Lightstreamer.Subscription(
         "MERGE",
         ["MARKET:IX.D.FTSE.DAILY.IP","MARKET:MT.D.GC.MONTH1.IP"],
         ["BID", "OFFER", "STRIKE_PRICE", "ODDS"]
     );

     // Set up Lightstreamer event listener
     subscription.addListener({
         onSubscription: function () {
             console.log('subscribed');
         },
         onUnsubscription: function () {
             console.log('unsubscribed');
         },
         onSubscriptionError: function (code, message) {
            console.log('subscription failure: ' + code + " message: " + message);
         },
         onItemUpdate: function (updateInfo) {
             // Lightstreamer published some data
             var epic = updateInfo.getItemName().split(":")[1];
             updateInfo.forEachField(function (fieldName, fieldPos, value) {
                     console.log('Field: ' + fieldName + " Value: " + value);
             });
         }
     });

     // Subscribe to Lightstreamer
     lsClient.subscribe(subscription);
}
