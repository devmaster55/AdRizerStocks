import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {AlphavantageDataSource} from '../datasources';

interface ISymbol {
  bestMatches: Array<object>;
  'Error Message'?: string,
}

interface ITimeSeriesElement {
  '1. open'?: string,
  '2. high'?: string,
  '3. low'?: string,
  '4. close'?: string,
  '5. volume'?: string,
}

interface ITimeSeriesStock {
  'Meta Data': object,
  'Time Series (5min)'?: { string: object },
  'Error Message'?: string, //'Error Message': 'Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_INTRADAY.'
}

export interface AlphavantageService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getTimeSeriesStock(function_choice: string, symbol: string, interval: string): Promise<ITimeSeriesStock>;
  lookForSymbol(function_choice: string, keywords: string): Promise<ISymbol>;
}

export class AlphavantageServiceProvider implements Provider<AlphavantageService> {
  constructor(
    // alphavantage must match the name property in the datasource json file
    @inject('datasources.alphavantage')
    protected dataSource: AlphavantageDataSource = new AlphavantageDataSource(),
  ) {}

  value(): Promise<AlphavantageService> {
    return getService(this.dataSource);
  }
}
