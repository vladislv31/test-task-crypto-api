import { IsIn, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class EstimateDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  inputAmount: number;

  @IsIn(['ETH', 'BTC', 'USDT'])
  inputCurrency: string;

  @IsIn(['ETH', 'BTC', 'USDT'])
  outputCurrency: string;
}
