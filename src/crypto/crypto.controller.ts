import {
  Controller,
  Get,
  HttpException,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { EstimateDto } from './dto/estimate.dto';
import { CryptoService } from './crypto.service';
import { GetRatesDto } from './dto/getRates.dto';

// TODO: create custom exception and handle it in exceptions filter

@Controller()
export class CryptoController {
  constructor(private readonly cryptoSerivce: CryptoService) {}

  @Get('/estimate')
  async estimate(@Query(new ValidationPipe()) estimateDto: EstimateDto) {
    try {
      return await this.cryptoSerivce.estimate(estimateDto);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  @Get('/getRates')
  async getRates(@Query(new ValidationPipe()) getRatesDto: GetRatesDto) {
    try {
      return await this.cryptoSerivce.getRates(getRatesDto);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }
}
