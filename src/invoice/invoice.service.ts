import { Injectable } from '@nestjs/common';
//
import { Invoice } from '../@types/invoice';
import { InvoicePDFService } from '../@pdf/invoice/invoice.service';

@Injectable()
export class InvoiceService {
  constructor(private _InvoicePDFService: InvoicePDFService) {}

  async generate(invoice: Invoice): Promise<Buffer> {
    return await this._InvoicePDFService.generate(invoice);
  }
}
