const path = require('path');
const PDFMake = require('pdfmake');
//
import { format } from 'date-fns';
import { Injectable } from '@nestjs/common';
//
import { Invoice } from '../../@types/invoice';

interface Font {
  Arimo: {
    normal: any;
    bold: any;
    italics: any;
    bolditalics: any;
  };
}

@Injectable()
export class InvoicePDFService {
  private readonly fonts: Font = {
    Arimo: {
      normal: path.join(
        __dirname,
        '..',
        '..',
        '/@fonts/arimo/Arimo-Regular.ttf'
      ),
      bold: path.join(__dirname, '..', '..', '/@fonts/arimo/Arimo-Medium.ttf'),
      italics: path.join(
        __dirname,
        '..',
        '..',
        '/@fonts/arimo/Arimo-Italic.ttf'
      ),
      bolditalics: path.join(
        __dirname,
        '..',
        '..',
        '/@fonts/arimo/Arimo-MediumItalic.ttf'
      )
    }
  };

  async generate(invoice: Invoice): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
      const printer = new PDFMake(this.fonts);

      const {
        no,
        tax,
        date,
        logo,
        total,
        notes,
        items,
        dueDate,
        subtotal,
        discount,
        dateHeaders,
        yourCompany,
        itemsHeaders,
        clientCompany,
        amountHeaders
      } = invoice;

      const content = [
        {
          columns: [
            [
              { text: 'Invoice', style: 'title' },
              [
                { text: yourCompany.company, style: 'subtitle' },
                { text: yourCompany.fullName, style: 'normal' },
                { text: yourCompany.website, style: 'normal' },
                { text: yourCompany.address, style: 'normal' },
                { text: yourCompany.city, style: 'normal' },
                { text: yourCompany.country, style: 'normal' },
                { text: yourCompany.phone, style: 'normal' },
                { text: yourCompany.email, style: 'normal' }
              ],
              { text: '', style: 'title' },
              [
                { text: clientCompany.company, style: 'subtitle' },
                { text: clientCompany.fullName, style: 'normal' },
                { text: clientCompany.address, style: 'normal' },
                { text: clientCompany.city, style: 'normal' },
                { text: clientCompany.country, style: 'normal' }
              ]
            ],
            [
              {
                ...(logo
                  ? {
                      stack: [
                        {
                          image: 'logo',
                          width: 150,
                          height: 150,
                          alignment: 'right',
                          margin: [0, 0, 0, 80]
                        }
                      ]
                    }
                  : { text: '', margin: [0, 0, 0, 230] })
              },
              {
                columns: [
                  { width: '35%', text: '' },
                  {
                    table: {
                      width: 'auto',
                      body: [
                        [
                          {
                            text: dateHeaders[0],
                            style: 'normal',
                            alignment: 'right',
                            bold: true
                          },
                          {
                            text: no,
                            style: 'normal',
                            alignment: 'right',
                            bold: true
                          }
                        ],
                        [
                          {
                            text: dateHeaders[1],
                            style: 'normal',
                            alignment: 'right',
                            bold: true
                          },
                          {
                            text: date ? format(date, 'MM/dd/yyyy') : '',
                            style: 'normal',
                            alignment: 'right'
                          }
                        ],
                        [
                          {
                            text: dateHeaders[2],
                            style: 'normal',
                            alignment: 'right',
                            bold: true
                          },
                          {
                            text: dueDate ? format(dueDate, 'MM/dd/yyyy') : '',
                            style: 'normal',
                            alignment: 'right'
                          }
                        ]
                      ]
                    },
                    layout: 'noBorders'
                  }
                ]
              }
            ]
          ]
        },
        {
          margin: [0, 30, 0, 30],
          table: {
            widths: ['20%', '*', '20%', '20%'],
            headerRows: 1,

            body: [
              [
                ...itemsHeaders.map((header) => ({
                  text: header,
                  style: 'tableHeader',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                }))
              ],
              ...items.map(({ cell1, cell2, cell3, cell4 }, index) => [
                {
                  text: cell1,
                  style: 'tableBody',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5],
                  ...(index % 2 && { fillColor: '#E0EFF6' }),
                  ...(!cell1 && { color: '#7c98b6' })
                },
                {
                  text: cell2,
                  style: 'tableBody',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5],
                  ...(index % 2 && { fillColor: '#E0EFF6' }),
                  ...(!cell2 && { color: '#7c98b6' })
                },
                {
                  text: cell3 || '0',
                  style: 'tableBody',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5],
                  ...(index % 2 && { fillColor: '#E0EFF6' }),
                  ...(!cell3 && { color: '#7c98b6' })
                },
                {
                  text: cell4 || '$0.00',
                  style: 'tableBody',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5],
                  ...(index % 2 && { fillColor: '#E0EFF6' }),
                  ...(!cell4 && { color: '#7c98b6' })
                }
              ])
            ]
          }
        },

        {
          table: {
            widths: ['*', '40%'],
            body: [
              [
                {
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: 'Notes:', style: 'normal', bold: true }],
                      [
                        {
                          text: notes,
                          style: 'normal',
                          bold: true,
                          color: 'black'
                        }
                      ]
                    ]
                  },
                  alignment: 'center',
                  layout: 'noBorders',
                  border: [false, false, false, false]
                },

                {
                  table: {
                    widths: ['50%', '50%', '10%'],
                    body: [
                      [
                        {
                          text: amountHeaders[0],
                          style: 'normal',
                          bold: true,
                          border: [false, false, false, false]
                        },
                        {
                          text: subtotal ? subtotal : '0.00',
                          style: 'normal',
                          alignment: 'right',
                          bold: true,
                          border: [false, false, false, false]
                        },
                        {
                          text: '',
                          style: 'normal',
                          alignment: 'right',
                          bold: true,
                          border: [false, false, false, false]
                        }
                      ],
                      [
                        {
                          text: amountHeaders[2],
                          style: 'normal',
                          bold: true,
                          border: [false, false, false, false]
                        },
                        {
                          text: tax ? tax : '',
                          style: 'normal',
                          alignment: 'right',
                          bold: true,
                          border: [false, false, false, false]
                        },
                        {
                          text: '%',
                          style: 'normal',
                          alignment: 'right',
                          bold: true,
                          border: [false, false, false, false]
                        }
                      ],
                      [
                        {
                          text: amountHeaders[3],
                          style: 'normal',
                          bold: true,
                          border: [false, false, false, true]
                        },
                        {
                          text: discount ? discount : '',
                          style: 'normal',
                          alignment: 'right',
                          bold: true,
                          border: [false, false, false, true]
                        },
                        {
                          text: '%',
                          style: 'normal',
                          alignment: 'right',
                          bold: true,
                          border: [false, false, false, false]
                        }
                      ],
                      [
                        {
                          text: amountHeaders[4],
                          style: 'normal',
                          bold: true,
                          border: [false, false, false, false]
                        },
                        {
                          text: total ? total : '0.00',
                          style: 'normal',
                          alignment: 'right',
                          bold: true,
                          border: [false, false, false, false]
                        },
                        {
                          text: '',
                          style: 'normal',
                          alignment: 'right',
                          bold: true,
                          border: [false, false, false, false]
                        }
                      ]
                    ]
                  },
                  border: [false, false, false, false]
                }
              ]
            ]
          }
        },

        {
          text: [
            {
              text: 'This invoice was created using the HubSpot ',
              style: 'normal',
              color: '#7c98b6'
            },
            {
              text: 'Invoice Template Generator',
              style: 'normal',
              color: '#0b8484',
              link: 'https://google.com'
            }
          ],
          alignment: 'center',
          margin: [0, 20, 0, 0]
        }
      ];

      const doc = {
        defaultStyle: { font: 'Arimo', columnGap: 20 },
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [50, 50, 50, 50],
        images: {
          ...(logo && { logo })
        },

        content,

        styles: {
          title: {
            bold: true,
            fontSize: 22,
            color: '#2D3E50',
            margin: [0, 0, 0, 20]
          },
          subtitle: {
            bold: true,
            fontSize: 16,
            color: '#2D3E50',
            margin: [0, 0, 0, 2]
          },
          normal: {
            fontSize: 12,
            color: '#2D3E50',
            margin: [0, 0, 0, 2]
          },
          tableHeader: {
            bold: true,
            fontSize: 14,
            color: 'white',
            fillColor: '#2D3E50'
          },
          tableBody: {
            bold: true,
            fontSize: 14,
            color: '#2D3E50'
          }
        }
      };

      const pdf = printer.createPdfKitDocument(doc as any);

      try {
        var chunks = [];
        pdf.on('data', (chunk) => chunks.push(chunk));
        pdf.on('end', () => resolve(Buffer.concat(chunks)));
        pdf.end();
      } catch (err) {
        reject(err);
      }
    });

    return pdfBuffer;
  }
}
