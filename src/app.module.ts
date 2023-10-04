import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [ConfigModule.forRoot(), CryptoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
