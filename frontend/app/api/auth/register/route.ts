import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper function to generate random password
function generatePassword(length = 10) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

export async function POST(request: Request) {
  try {
    const { email, password: providedPassword } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Use provided password or generate random one
    const password = providedPassword || generatePassword(12);

    // Register user in Strapi using the users-permissions plugin
    const strapiResponse = await fetch(`${process.env.BACK_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        email: email,
        password: password,
      }),
    });

    console.log('Strapi registration response status:', strapiResponse.status);

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      console.error('Strapi registration error:', errorData);
      return NextResponse.json(
        { error: errorData.error?.message || errorData.message || 'Registration failed' },
        { status: strapiResponse.status }
      );
    }

    const userData = await strapiResponse.json();

    // Send password and confirmation to user's email
    try {
      console.log('Attempting to send registration email to:', email);
      console.log('SMTP Config:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT === '465',
        user: process.env.SMTP_USERNAME
      });

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_PORT === '465', // Port 465 is usually for SSL/TLS
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const mailOptions = {
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
        to: email,
        subject: 'Регистрация успешно завершена',
        text: `
Здравствуйте!

Ваш аккаунт успешно создан и подтвержден.

Ваш email: ${email}
Ваш пароль: ${password}

Вы можете войти на сайте используя эти данные.

С уважением,
Команда ${process.env.MAIL_FROM_NAME}
      `,
        html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #FF4000;">Регистрация успешно завершена</h2>
          <p>Здравствуйте!</p>
          <p>Ваш аккаунт успешно создан и подтвержден.</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Ваш email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Ваш пароль:</strong> ${password}</p>
          </div>
          <p>Вы можете войти на сайте используя эти данные.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 14px;">С уважением,<br />Команда ${process.env.MAIL_FROM_NAME}</p>
        </div>
      `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Registration email sent successfully:', info.messageId);
    } catch (emailError) {
      console.error('Detailed Email sending error:', emailError);
      // Continue even if email fails - user is registered
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Password sent to email.',
      user: userData.user,
      jwt: userData.jwt,
      password: password, // Return password for auto-authentication
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
