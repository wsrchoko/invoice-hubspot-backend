import { Module } from '@nestjs/common';
//
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoicePDFService } from '../@pdf/invoice/invoice.service';

@Module({
  imports: [],
  providers: [InvoiceService, InvoicePDFService],
  exports: [InvoiceService],
  controllers: [InvoiceController]
})
export class InvoiceModule {}
