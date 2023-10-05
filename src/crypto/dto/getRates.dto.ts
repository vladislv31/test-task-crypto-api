import { IsIn } from 'class-validator';
import { currencies } from '../constants';

export class GetRatesDto {
  @IsIn(currencies)
  baseCurrency: string;

  @IsIn(currencies)
  quoteCurrency: string;
}
