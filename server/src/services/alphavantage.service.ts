import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {AlphavantageDataSource} from '../datasources';

export interface AlphavantageService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getTimeSeriesStock(function_choice: string, symbol: string, interval: string): Promise<object>;
  lookForSymbol(function_choice: string, keywords: string): Promise<object>;
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
