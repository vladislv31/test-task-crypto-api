import { IsIn, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { currencies } from '../constants';

export class EstimateDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  inputAmount: number;

  @IsIn(currencies)
  inputCurrency: string;

  @IsIn(currencies)
  outputCurrency: string;
}
