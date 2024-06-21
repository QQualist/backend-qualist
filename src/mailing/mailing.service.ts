import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {
  private transporter: nodemailer.Transporter;
  private templates: Record<string, handlebars.TemplateDelegate>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      pool: true,
      rateLimit: 5, // Limit 5 emails by second
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 20000, // 20 seconds
      tls: {
        ciphers: process.env.MAIL_CIPHERS,
      },
    });

    // Load all Handlebars templates
    this.templates = this.loadAllTemplates();
  }

  private loadAllTemplates(): Record<string, handlebars.TemplateDelegate> {
    const templates: Record<string, handlebars.TemplateDelegate> = {};
    const templateDir = path.join(process.cwd(), 'src', 'mailing', 'templates');
    const templateFiles = fs.readdirSync(templateDir);

    templateFiles.forEach((file) => {
      const ext = path.extname(file);
      if (ext === '.hbs') {
        const templateName = path.basename(file, ext);
        const templatePath = path.join(templateDir, file);
        const templateSource = fs.readFileSync(templatePath, 'utf8');
        templates[templateName] = handlebars.compile(templateSource);
      }
    });

    return templates;
  }

  private loadCssFile(templateName: string): string {
    const cssFilePath = path.join(
      process.cwd(),
      'src',
      'mailing',
      'templates',
      `${templateName}.css`,
    );
    if (fs.existsSync(cssFilePath)) {
      return fs.readFileSync(cssFilePath, 'utf8');
    }
    return '';
  }

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  private async sendWithRetry(
    mailOptions: nodemailer.SendMailOptions,
    retries = 3,
    delayTime = 1000,
  ) {
    for (let i = 0; i < retries; i++) {
      try {
        await this.transporter.sendMail(mailOptions);
        return;
      } catch (err) {
        if (i < retries - 1) {
          await this.delay(delayTime);
          delayTime *= 2; // Exponential backoff
        } else {
          throw err;
        }
      }
    }
  }

  async sendMail(
    templateName: string,
    data: any,
    options: nodemailer.SendMailOptions,
  ) {
    const css = this.loadCssFile(templateName);
    const html = this.templates[templateName]({ ...data, css });
    await this.sendWithRetry({
      ...options,
      from: `Qualist < ${process.env.MAIL_USERNAME} >`,
      html,
    });
  }
}
