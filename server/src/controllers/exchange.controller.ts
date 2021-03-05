// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
  param,
} from '@loopback/rest';

import {AlphavantageService} from '../services';
/**
 * OpenAPI response for ping()
 */
const EQUITY_RESPONSE: ResponseObject = {
  description: 'Equity Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'EquityResponse',
        properties: {
          greeting: {type: 'string'},
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

interface INewSymbolObject {
  symbol: string,
  name: string,
}

interface INewMetaData {
  information?: string,
  symbol?: string,
  last_refreshed?: string,
  interval?: string,
  output_size?: string,
  timezone?: string,
}

interface INewTimeSeriesElement {
  timestamp?: string,
  total_volumn?: string,
  min_price?: string,
  max_price?: string,
  opening_price?: string,
  closing_price?: string,
}

export class ExchangeController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('services.AlphavantageService') protected alphavantageService: AlphavantageService) {}

  // Map to `GET /exchange/equity`
  @get('/exchange/equity')
  @response(200, EQUITY_RESPONSE)
  async provideGlobalEquity(
    @param.query.string('function_choice') function_choice: string,
    @param.query.string('symbol') symbol: string,
  ): Promise<object> {
    const result = await this.alphavantageService.getTimeSeriesStock(function_choice, symbol, '5min');

    let tempMetaData = result['Meta Data']
    let newMetaData:INewMetaData = {};
    for (const [key, value] of Object.entries(tempMetaData)) {
      switch (key) {
        case '1. Information':
          newMetaData['information'] = value;
          break;
        case '2. Symbol':
          newMetaData['symbol'] = value;
          break;
        case '3. Last Refreshed':
          newMetaData['last_refreshed'] = value;
          break;
        case '4. Interval':
          newMetaData['interval'] = value;
          break;
        case '5. Output Size':
          newMetaData['output_size'] = value;
          break;
        case '6. Time Zone':
          newMetaData['timezone'] = value;
          break;
        default:
          break;
      }
    }

    let tempTimeSeries = result['Time Series (5min)'];
    let newTimeSeries: Array<INewTimeSeriesElement> = [];
    if (tempTimeSeries != undefined) {
      let newElement:INewTimeSeriesElement = {}
      for (const [key, objectValue] of Object.entries(tempTimeSeries)) {
        newElement['timestamp'] = key;
        for (const [key, value] of Object.entries(objectValue)) {
          switch (key) {
            case '1. open':
              newElement['opening_price'] = value;
              break;
            case '2. high':
              newElement['max_price'] = value;
              break;
            case '3. low':
              newElement['min_price'] = value
              break;
            case '4. close':
              newElement['closing_price'] = value
              break;
            case '5. volume':
              newElement['total_volumn'] = value
              break;
            default:
              break;
          }
        }
        newTimeSeries.push(newElement)
      }
    }

    return {
      meta_data: newMetaData,
      time_series: newTimeSeries,
    };
  }

  // Map to `GET /lookForSymbol`
  @get('/lookForSymbol')
  @response(200, EQUITY_RESPONSE)
  async aynclookForSymbol(
    @param.query.string('keywords') keywords: string,
  ): Promise<object> {
    const result = await this.alphavantageService.lookForSymbol('SYMBOL_SEARCH', keywords);
    let newBestMatches = result.bestMatches.map((symbol) => {
      let temp:INewSymbolObject = { symbol: '', name: '' };
      for (const [key, value] of Object.entries(symbol)) {
        switch (key) {
          case '1. symbol':
            temp['symbol'] = value;
            break;
          case '2. name':
            temp['name'] = value;
            break;
          default:
            break;
        }
      }
      return temp;
    })

    return newBestMatches;
  }
}
