import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'alphavantage',
  connector: 'rest',
  baseURL: 'https://alphavantage.co',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        // url: 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo',
        url: 'https://www.alphavantage.co/query?function={function_choice}&symbol={symbol}&interval={interval}&apikey=F6IJG6LLGR0C5V6U',
      },
      functions: {
        getTimeSeriesStock: ['function_choice', 'symbol', 'interval'],
      },
    },
    {
      template: {
        method: 'GET',
        // url: 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo',
        url: 'https://www.alphavantage.co/query?function={function_choice}&keywords={keywords}&apikey=F6IJG6LLGR0C5V6U',
      },
      functions: {
        lookForSymbol: ['function_choice', 'keywords'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AlphavantageDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'alphavantage';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.alphavantage', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
