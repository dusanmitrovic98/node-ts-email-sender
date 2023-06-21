import nodemailer, {Trasporter } from 'nodemailer';
import { ReadStream, createReadStream } from 'fs';
import { promisify } from 'util';

function app(): void {
