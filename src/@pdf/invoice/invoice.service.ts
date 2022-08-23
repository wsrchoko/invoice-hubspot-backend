const path = require('path');
const PDFMake = require('pdfmake');
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

      const { logo } = invoice;

      const content = [
        {
          columns: [
            [
              { text: 'Invoice', style: 'title' },
              [
                { text: 'Company', style: 'subtitle' },
                { text: 'First name and last name', style: 'normal' },
                { text: 'Company website', style: 'normal' },
                { text: 'Company Address', style: 'normal' },
                { text: 'City, State ZIP', style: 'normal' },
                { text: 'Country', style: 'normal' },
                { text: '33333333333333333333', style: 'normal' },
                { text: 'jona.itp@gmail.com', style: 'normal' }
              ],
              { text: '', style: 'title' },
              [
                { text: "Client's company", style: 'subtitle' },
                { text: "Client's name", style: 'normal' },
                { text: "Client's Address", style: 'normal' },
                { text: 'City, State ZIP', style: 'normal' },
                { text: 'Country', style: 'normal' }
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
                            text: 'Invoice No:',
                            style: 'normal',
                            alignment: 'right',
                            bold: true
                          },
                          {
                            text: '11111111',
                            style: 'normal',
                            alignment: 'right',
                            bold: true
                          }
                        ],
                        [
                          {
                            text: 'Invoice Date:',
                            style: 'normal',
                            alignment: 'right',
                            bold: true
                          },
                          {
                            text: '08/22/2022',
                            style: 'normal',
                            alignment: 'right'
                          }
                        ],
                        [
                          {
                            text: 'Due Date:',
                            style: 'normal',
                            alignment: 'right',
                            bold: true
                          },
                          {
                            text: '08/22/2022',
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
                {
                  text: 'ID',
                  style: 'tableHeader',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                },
                {
                  text: 'Description',
                  style: 'tableHeader',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                },
                {
                  text: 'Hours',
                  style: 'tableHeader',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                },
                {
                  text: 'Rate',
                  style: 'tableHeader',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                }
              ],
              [
                {
                  text: '1S',
                  style: 'tableBody',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                },
                {
                  text: 'Item Description',
                  style: 'tableBody',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                },
                {
                  text: '12',
                  style: 'tableBody',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                },
                {
                  text: '100',
                  style: 'tableBody',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                }
              ],
              [
                {
                  text: '1S',
                  style: 'tableBody',
                  fillColor: '#E0EFF6',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                },
                {
                  text: 'Item Description',
                  style: 'tableBody',
                  fillColor: '#E0EFF6',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                },
                {
                  text: '12',
                  style: 'tableBody',
                  fillColor: '#E0EFF6',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                },
                {
                  text: '100',
                  style: 'tableBody',
                  fillColor: '#E0EFF6',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5]
                }
              ]
            ]
          }
          // 			layout: 'noBorders',
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
                          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
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
                          text: 'Subtotal:',
                          style: 'normal',
                          bold: true,
                          border: [false, false, false, false]
                        },
                        {
                          text: '1300.00',
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
                          text: 'Tax:',
                          style: 'normal',
                          bold: true,
                          border: [false, false, false, false]
                        },
                        {
                          text: '10',
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
                          text: 'Discount:',
                          style: 'normal',
                          bold: true,
                          border: [false, false, false, true]
                        },
                        {
                          text: '10',
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
                          text: 'Total:',
                          style: 'normal',
                          bold: true,
                          border: [false, false, false, false]
                        },
                        {
                          text: '1287.00',
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
                  //   layout: 'noBorders',
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
              link: 'http://google.com'
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
          // logo: 'data:image/png;base64,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'
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
