import { Injectable } from '@nestjs/common';
import { AbstractExchange } from './exchanges/abstract.exchange';
import { BinanceExchange } from './exchanges/binance.exchange';
import { EstimateDto } from './dto/estimate.dto';
import { ExchangeSymbol } from './utils/exchangeSymbol.util';
import { KucoinExchange } from './exchanges/kucoin.exchange';
import { GetRatesDto } from './dto/getRates.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  private readonly exchanges: { [key: string]: AbstractExchange };

  constructor(private readonly configService: ConfigService) {
    this.exchanges = {
      binance: new BinanceExchange({
        apiUrl: this.configService.get('BINANCE_API_BASE_URL'),
      }),
      kucoin: new KucoinExchange({
        apiUrl: this.configService.get('KUCOIN_API_BASE_URL'),
      }),
    };
  }

  async estimate(estimateDto: EstimateDto) {
    const exchangeSymbol = new ExchangeSymbol(
      estimateDto.inputCurrency,
      estimateDto.outputCurrency,
    );
    const exchangesRates = await this.getExchangesRates(exchangeSymbol);

    const estimated = exchangesRates.reduce((prev, current) => {
      return prev.rate > current.rate ? prev : current;
    });

    return {
      exchangeName: estimated.exchangeName,
      outputAmount: estimated.rate * estimateDto.inputAmount,
    };
  }

  async getRates(getRatesDto: GetRatesDto) {
    const exchangeSymbol = new ExchangeSymbol(
      getRatesDto.baseCurrency,
      getRatesDto.quoteCurrency,
    );

    return this.getExchangesRates(exchangeSymbol);
  }

  private async getExchangesRates(exchangeSymbol: ExchangeSymbol) {
    try {
      const exchangesRates: { exchangeName: string; rate: number }[] = [];

      await Promise.all(
        Object.keys(this.exchanges).map(async (exchangeName) => {
          const result =
            await this.exchanges[exchangeName].getPairRate(exchangeSymbol);
          exchangesRates.push({
            exchangeName,
            rate: exchangeSymbol.reversed ? 1 / result : result,
          });
        }),
      );

      return exchangesRates;
    } catch (e) {
      // TODO: log error
      throw new Error('Something went wrong when fetching API.');
    }
  }
}
