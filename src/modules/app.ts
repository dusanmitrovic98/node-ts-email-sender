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
