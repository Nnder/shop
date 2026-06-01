import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, orderData, products, productCount } = await request.json();

    if (!email || !orderData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    console.log('Attempting to send order confirmation email to:', email);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Build product list for email
    const productList = products.map((product: any, index: number) => {
      const pCount = productCount.find((pc: any) => pc.id === product.id)?.count || 1;
      const price = product.price || 0;
      const total = price * pCount;
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
            ${product.title || 'Товар'}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center;">
            ${pCount}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;">
            ${price} ₽
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;">
            ${total} ₽
          </td>
        </tr>
      `;
    }).join('');

    // Email content
    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: email,
      subject: `Заказ #${orderData.id} успешно создан`,
      text: `
Здравствуйте!

Ваш заказ успешно создан.

Номер заказа: #${orderData.id}
Статус: ${orderData.status || 'Новая'}
Сумма: ${orderData.sum || 0} ₽

Состав заказа:
${products.map((product: any) => {
  const pCount = productCount.find((pc: any) => pc.id === product.id)?.count || 1;
  return `- ${product.title || 'Товар'} x${pCount} = ${(product.price || 0) * pCount} ₽`;
}).join('\n')}

С уважением,
Команда ${process.env.MAIL_FROM_NAME}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #FF4000;">Заказ успешно создан</h2>
          <p>Здравствуйте!</p>
          <p>Ваш заказ успешно создан.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 12px; border-bottom: 2px solid #FF4000; font-weight: bold; width: 50%;">
                Номер заказа
              </td>
              <td style="padding: 12px; border-bottom: 2px solid #FF4000; font-weight: bold;">
                #${orderData.id}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
                Статус
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
                ${orderData.status || 'Новая'}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
                Сумма
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #FF4000;">
                ${orderData.sum || 0} ₽
              </td>
            </tr>
          </table>

          <h3>Состав заказа:</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 12px; border-bottom: 2px solid #e0e0e0; text-align: left;">
                  Товар
                </th>
                <th style="padding: 12px; border-bottom: 2px solid #e0e0e0; text-align: center;">
                  Кол-во
                </th>
                <th style="padding: 12px; border-bottom: 2px solid #e0e0e0; text-align: right;">
                  Цена
                </th>
                <th style="padding: 12px; border-bottom: 2px solid #e0e0e0; text-align: right;">
                  Сумма
                </th>
              </tr>
            </thead>
            <tbody>
              ${productList}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 12px; border-top: 2px solid #FF4000; text-align: right; font-weight: bold;">
                  Итого:
                </td>
                <td style="padding: 12px; border-top: 2px solid #FF4000; text-align: right; font-weight: bold; color: #FF4000;">
                  ${orderData.sum || 0} ₽
                </td>
              </tr>
            </tfoot>
          </table>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 14px;">С уважением,<br />Команда ${process.env.MAIL_FROM_NAME}</p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully:', info.messageId);

    return NextResponse.json(
      { success: true, message: 'Order confirmation email sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Order confirmation email error:', error);
    return NextResponse.json(
      { error: 'Failed to send order confirmation email' },
      { status: 500 }
    );
  }
}
