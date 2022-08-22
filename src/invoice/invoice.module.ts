import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';

@Module({
  imports: [],
  providers: [InvoiceService],
  exports: [InvoiceService],
  controllers: [InvoiceController]
})
export class InvoiceModule {}
