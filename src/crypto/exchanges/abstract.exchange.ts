import { ExchangeSymbol } from '../utils/exchangeSymbol.util';

export abstract class AbstractExchange {
  abstract getPairRate(symbol: ExchangeSymbol): Promise<number>;
}
