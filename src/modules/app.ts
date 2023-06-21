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
  
  const fromEmail = 'your-email@gmail.com';
  const toEmail = 'recipient-email@example.com';
  const emailSubject = 'Email with Attachments';
  const emailText = 'Hello, this email contains attachments!';
  const htmlContent = '<h1>Email with Attachments</h1><p>Hello, this email contains attachments!</p>';
  const attachmentPaths = ['path/to/attachment1.txt', 'path/to/attachment2.png'];
  
  sendEmailWithAttachments(fromEmail, toEmail, emailSubject, emailText, attachmentPaths)
    .then(() => {
      return sendHTMLEmail(fromEmail, toEmail, emailSubject, htmlContent);
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });
}
