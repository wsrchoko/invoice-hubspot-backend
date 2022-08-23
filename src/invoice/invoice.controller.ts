import { Response } from 'express';
import { Body, Post, Controller, Res } from '@nestjs/common';
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
  async generate(@Body() invoice: Invoice, @Res() res: Response) {
    const buffer = await this._InvoiceService.generate(invoice);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice.pdf`,
      'Content-Length': buffer.length
    });

    res.end(buffer);
  }
}
