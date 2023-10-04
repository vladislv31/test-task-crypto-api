import { ExchangeSymbol } from '../utils/exchangeSymbol.util';
import { AbstractExchange } from './abstract.exchange';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BinanceExchange implements AbstractExchange {
  private readonly apiUrl: string;

  constructor({ apiUrl }: { apiUrl: string }) {
    this.apiUrl = apiUrl;
  }

  async getPairRate(symbol: ExchangeSymbol): Promise<number> {
    const lastTrade = await fetch(
      `${this.apiUrl}/trades?symbol=${symbol.symbol.join('')}&limit=1`,
      {
        method: 'GET',
      },
    );

    const lastTradeJson = (await lastTrade.json()) as unknown as {
      price: string;
    }[];

    return +lastTradeJson[0].price;
  }
}
