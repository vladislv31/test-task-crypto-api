import { Injectable } from '@nestjs/common';
import { ExchangeSymbol } from '../utils/exchangeSymbol.util';
import { AbstractExchange } from './abstract.exchange';

@Injectable()
export class KucoinExchange implements AbstractExchange {
  private readonly apiUrl: string;

  constructor({ apiUrl }: { apiUrl: string }) {
    this.apiUrl = apiUrl;
  }

  async getPairRate(symbol: ExchangeSymbol): Promise<number> {
    const history = await fetch(
      `${this.apiUrl}/market/histories?symbol=${symbol.symbol.join('-')}`,
      {
        method: 'GET',
      },
    );

    const historyJson = (await history.json()) as unknown as {
      data: { price: string }[];
    };

    return +historyJson.data[0].price;
  }
}
