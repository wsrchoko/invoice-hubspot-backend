import { Injectable } from '@nestjs/common';
//
import { Invoice } from '../@types/invoice';

@Injectable()
export class InvoiceService {
  constructor() {}

  async generate(invoice: Invoice): Promise<Buffer> {
    return null;
  }
}
