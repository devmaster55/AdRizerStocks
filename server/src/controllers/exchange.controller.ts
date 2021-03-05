// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
} from '@loopback/rest';

import {AlphavantageService} from '../services';
/**
 * OpenAPI response for ping()
 */
const EQUITY_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export class ExchangeController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('services.AlphavantageService') protected alphavantageService: AlphavantageService) {}

  // Map to `GET /exchange/equity`
  @get('/exchange/equity')
  @response(200, EQUITY_RESPONSE)
  provideGlobalEquity(): Promise<object> {
    // Reply with a greeting, the current time, the url, and request headers
    const result = this.alphavantageService.getTimeSeriesStock('TIME_SERIES_INTRADAY', 'IBM', '5min');
    return result;
  }

  // Map to `GET /exchange/equity`
  @get('/lookForSymbol')
  @response(200, EQUITY_RESPONSE)
  lookForSymbol(): Promise<object> {
    // Reply with a greeting, the current time, the url, and request headers
    const result = this.alphavantageService.lookForSymbol('SYMBOL_SEARCH', 'IBM');
    return result;
  }
}
