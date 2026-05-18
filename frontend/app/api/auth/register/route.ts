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
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate random password
    const password = generatePassword(12);

    // Register user in Strapi
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

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      return NextResponse.json(
        { error: errorData.error?.message || 'Registration failed' },
        { status: strapiResponse.status }
      );
    }

    const userData = await strapiResponse.json();

    // Send password to user's email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_ENCRYPTION === 'ssl',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
      to: email,
      subject: 'Ваш пароль для входа',
      text: `
Здравствуйте!

Ваш аккаунт успешно создан.

Ваш email: ${email}
Ваш пароль: ${password}

Вы можете войти на сайте используя эти данные.

С уважением,
Команда ${process.env.MAIL_FROM_NAME}
      `,
      html: `
        <h2>Ваш аккаунт успешно создан</h2>
        <p>Здравствуйте!</p>
        <p>Ваш аккаунт успешно создан.</p>
        <p><strong>Ваш email:</strong> ${email}</p>
        <p><strong>Ваш пароль:</strong> ${password}</p>
        <p>Вы можете войти на сайте используя эти данные.</p>
        <hr />
        <p>С уважением,<br />Команда ${process.env.MAIL_FROM_NAME}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

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
