import nodemailer, {Trasporter } from 'nodemailer';
import { ReadStream, createReadStream } from 'fs';
import { promisify } from 'util';

function app(): void {
  const transporter: Transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });
  
  const readFileAsync = promisify(createReadStream);
  
  async function sendEmailWithAttachments(
    from: string,
    to: string,
    subject: string,
    text: string,
    attachments: string[]
  ): Promise<void> {
    const mailOptions = {
      from,
      to,
      subject,
      text,
      attachments: [],
    };
  
    for (const attachment of attachments) {
      const fileStream: ReadStream = await readFileAsync(attachment);
      const attachmentInfo = {
        filename: attachment,
        content: fileStream,
      };
      mailOptions.attachments.push(attachmentInfo);
    }
  
    await transporter.sendMail(mailOptions);
    console.log('Email sent with attachments');
  }
  
  async function sendHTMLEmail(from: string, to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from,
      to,
      subject,
      html,
    };
  
    await transporter.sendMail(mailOptions);
    console.log('HTML email sent');
  }
