import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from './middlewares/logger';
import api from './middlewares/api';
import streamMarkets from './middlewares/stream-markets';
import streamChart from './middlewares/stream-chart';
import streamTrades from './middlewares/stream-trades';
import connectLs from './middlewares/connect-ls';
import reducers from './reducers';
import Session from './session-stores/session';
import LsClient from './clients/ls-client';
import MarketSubscription from './subscriptions/market-subscription';
import BalanceSubscription from './subscriptions/balance-subscription';
import ChartSubscription from './subscriptions/chart-subscription';
import TradeSubscription from './subscriptions/trade-subscription';
import PositionSubscription from './subscriptions/position-subscription';

const configureStore = () => {
  const sessionStore = new Session();
  const lsClient = new LsClient();
  const marketsSubscription = new MarketSubscription(
        lsClient,
        ['MARKET_STATE', 'STRIKE_PRICE', 'ODDS'],
        ['marketStatus', 'strike', 'odds']
      );
  const balanceSubscription = new BalanceSubscription(
        lsClient,
        ['PNL', 'AVAILABLE_CASH'],
        ['profitLoss', 'availableCash']
      );
  const chartSubscription = new ChartSubscription(lsClient);
  const tradeSubscription = new TradeSubscription(lsClient);
  const positionSubscription = new PositionSubscription(lsClient);

  const middlewares = [
    reduxThunk,
    api(sessionStore),
    connectLs(lsClient),
    streamMarkets(marketsSubscription),
    streamChart(chartSubscription),
    streamTrades(
      tradeSubscription,
      positionSubscription,
      balanceSubscription
    ),
    logger,
  ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  const store = createStoreWithMiddleware(reducers);

  return store;
}

export default configureStore;
