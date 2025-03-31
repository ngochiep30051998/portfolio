import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    // Lấy dữ liệu từ body request
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Cấu hình transporter cho Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USERNAME, // Email của bạn (từ biến môi trường)
        pass: process.env.GMAIL_PASSWORD, // App Password (không phải mật khẩu tài khoản)
      },
    });

    // Gửi email
    await transporter.sendMail({
      from: `"${email}" <${process.env.GMAIL_USERNAME}>`, // Người gửi
      to: 'ngochiep30051998@gmail.com', // Email người nhận
      subject: `New message from ${email}`, // Tiêu đề email
      text: message, // Nội dung dạng văn bản
      replyTo: email, // Email để người nhận phản hồi
    });

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
