import { Body, Post, Controller } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
//
import { InvoiceService } from './invoice.service';
import { Invoice, InvoiceSuccess } from './invoice.dto';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private _InvoiceService: InvoiceService) {}

  @Post()
  @ApiOkResponse({ description: '', type: InvoiceSuccess })
  async generate(@Body() invoice: Invoice) {
    await this._InvoiceService.generate(invoice);
    return invoice;
  }
}
