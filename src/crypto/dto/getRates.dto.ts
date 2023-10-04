import { IsIn } from 'class-validator';

export class GetRatesDto {
  @IsIn(['ETH', 'BTC', 'USDT'])
  baseCurrency: string;

  @IsIn(['ETH', 'BTC', 'USDT'])
  quoteCurrency: string;
}
