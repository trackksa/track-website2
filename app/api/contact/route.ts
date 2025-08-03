import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, phone, email, message } = await request.json();

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // mail.yourdomain.com
      port: Number(process.env.SMTP_PORT), // 465 or 587
      secure: process.env.SMTP_SECURE === "true", // true for port 465
      auth: {
        user: process.env.SMTP_USER, // e.g., contact@yourdomain.com
        pass: process.env.SMTP_PASS, // app password or real password
      },
    });

    const companyHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #28bba4; border-radius: 8px;">
          <div style="background-color: #28bba4; padding: 20px; text-align: center;">
            <h2 style="margin: 0; color: white;">📩 New Contact Form Submission</h2>
          </div>
          <div style="padding: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      </div>
    `;

    const userHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #28bba4; border-radius: 8px;">
          <div style="background-color: #28bba4; padding: 20px; text-align: center;">
            <h2 style="margin: 0; color: white;">🤝 Thank You for Contacting Us</h2>
          </div>
          <div style="padding: 20px;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to us. We have received your message and will respond shortly.</p>

            <h3 style="margin-top: 20px;">📝 Your Message:</h3>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>

            <hr style="margin: 30px 0; border-top: 1px solid #28bba4;" />

            <p style="text-align: center;">🌟 We appreciate your interest and will be in touch soon.</p>
            <p style="text-align: center;">Best regards,<br><strong>The Track Team</strong></p>
          </div>
        </div>
      </div>
    `;

    // Send to your own inbox
    await transporter.sendMail({
      from: `"Track Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `📬 New message from ${name}`,
      html: companyHtml,
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: `"Track Website" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "📩 We've received your message",
      html: userHtml,
    });

    return NextResponse.json(
      { message: "Messages sent successfully." },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { error: "An error occurred while sending messages." },
      { status: 500 }
    );
  }
}
