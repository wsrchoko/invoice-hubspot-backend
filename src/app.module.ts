import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [ConfigModule.forRoot(), InvoiceModule]
})
export class AppModule {}
