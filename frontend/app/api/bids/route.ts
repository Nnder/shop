import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/src/6_shared/auth/config';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    const bidData = await request.json();

    // Securely set the user email from session if authenticated
    const userEmail = session?.user?.email || bidData.users_permissions_user;
    if (userEmail) {
      bidData.users_permissions_user = userEmail;
    }

    console.log('Bid data being sent to Strapi:', JSON.stringify(bidData, null, 2));

    const apiToken = process.env.STRAPI_API_TOKEN;

    if (!apiToken) {
      console.error('STRAPI_API_TOKEN is not defined in environment variables');
      // If token is missing, we can't proceed with authenticated Strapi call
      return NextResponse.json(
        { error: 'Server configuration error: Missing API Token' },
        { status: 500 }
      );
    }

    // Create bid in Strapi using API token
    const strapiResponse = await fetch(`${process.env.BACK_URL}/api/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ data: bidData }),
    });

    console.log('Strapi bid creation response status:', strapiResponse.status);

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      console.error('Strapi bid creation error:', errorData);
      return NextResponse.json(
        { error: errorData.error?.message || errorData.message || 'Bid creation failed' },
        { status: strapiResponse.status }
      );
    }

    const result = await strapiResponse.json();
    console.log('Strapi bid creation result:', JSON.stringify(result, null, 2));

    // Handle both transformed and untransformed responses
    const finalData = result.data || result;

    // Send email notification to managers
    try {
      const managerEmails = process.env.MANAGER_EMAILS?.split(',').map(e => e.trim()).filter(Boolean);
      if (managerEmails && managerEmails.length > 0) {
        console.log('Attempting to send manager notification email to:', managerEmails);

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        const productListHtml = bidData.products.map((product: any) => {
            const count = JSON.parse(bidData.counts).find((item: any) => product.id === item.id)?.count || 0;
            const itemTotal = (product.price || 0) * count;
            return `
                <li>${product.title} (x${count}) - ${itemTotal} ₽</li>
            `;
        }).join('');

        const mailOptions = {
          from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
          to: managerEmails.join(','),
          subject: `НОВАЯ ЗАЯВКА #${finalData.id} от ${bidData.fio}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #FF4000;">Новая Заявка на сайте</h2>
              <p>Поступила новая заявка от пользователя:</p>
              <ul>
                <li><strong>ID Заявки:</strong> #${finalData.id}</li>
                <li><strong>ФИО:</strong> ${bidData.fio}</li>
                <li><strong>Телефон:</strong> ${bidData.phone}</li>
                <li><strong>Email Пользователя:</strong> ${userEmail || 'Не указан'}</li>
                <li><strong>Сумма:</strong> ${bidData.sum} ₽</li>
              </ul>
              ${bidData.message ? `<p><strong>Комментарий:</strong> ${bidData.message}</p>` : ''}

              <h3>Состав заказа:</h3>
              <ul>
                ${productListHtml}
              </ul>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="color: #666; font-size: 14px;">С уважением,<br />Система уведомлений магазина</p>
            </div>
          `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Manager notification email sent successfully:', info.messageId);
      } else {
        console.warn('No MANAGER_EMAILS configured. Skipping manager notification.');
      }
    } catch (emailError) {
      console.error('Error sending manager notification email:', emailError);
    }

    return NextResponse.json({
      success: true,
      data: finalData,
    });
  } catch (error) {
    console.error('Bid creation error:', error);
    return NextResponse.json(
      { error: 'Bid creation failed' },
      { status: 500 }
    );
  }
}
