import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Logger } from 'winston';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailDTO } from './dtos/SendEmailDTO';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { StatusCodes } from 'http-status-codes';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class EmailService {
  // Default log msg
  private readonly name: string;
  // Connection to gmail
  private readonly transporter: any;
  // Default configurations to send email
  private readonly defaultOpts: {};
  // Path
  private readonly hbsViews: string;

  /**
   * Create default params that need to be with injections or services
   * @param {ConfigService} configs The config service module
   * @param {WinstonLogger} logger The logger
   */
  constructor(
    // Service to read dotfile
    private readonly configs: ConfigService,
    // Logger
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    this.hbsViews = path.resolve(__dirname, '..', '..', '..', 'views');

    // Create transporters (nodemailer)
    try {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        // service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: configs.get<string>('USER_EMAIL'),
          pass: configs.get<string>('USER_PASSWORD'),
        },
      });
    } catch (err) {
      this.logger.error(
        `Some error ocurred when trying to get authentication from google.`,
      );
    }

    // Assign email options
    this.defaultOpts = {
      from: 'Sigaa Form <sigaaForm@noreplay.com>', // sender address
      to: 'p.augustocampos@gmail.com',
      subject: '[Formulário Sigaa] Compentências',
      html: null,
    };

    // Assign name for this module
    this.name = '[EmailModule]';
  }

  /**
   * Get status from this module
   */
  async getInfos(ip: string): Promise<string> {
    this.logger.info(`${this.name} GetInfos -> Req Ip ${ip}`);
    // Create a handlebars to this section
    var source = fs.readFileSync(
      path.join(this.hbsViews, 'logs.handlebars'),
      'utf8',
    );
    const template = Handlebars.compile(source);
    // -------------------------------
    // ToDo get name of last file
    // const p = path.join(__dirname, '..', '..', 'logs', 'log.log');
    // console.log('EmailService -> p', p);
    // try {
    //   const rows = fs.readFileSync(p, { encoding: 'utf8', flag: 'r' });
    //   console.log('EmailService -> rows', rows);
    // } catch (err) {
    //   console.log('EmailService -> err', err);
    // }
    // --------------------------------
    const rows = [
      "File currently not working due the problem to open the log file while it's still being used by winston",
    ];
    const pageToSend = template({ rows: rows, date: `${Date().toString()}` });
    // '<h1 style="text-align:center;color:green;margin:10em">Api online</h1>'
    return pageToSend;
  }

  /**
   * Send mail to researches
   * @param {SendEmailDTO} data The data got it from form page
   * @return Void
   * @throws 503 If message couldn't be sent
   */
  async sendMail(ip: string, data: SendEmailDTO): Promise<void> {
    // Create a handlebars to this section
    var source = fs.readFileSync(
      path.join(this.hbsViews, 'form.handlebars'),
      'utf8',
    );
    const template = Handlebars.compile(source);

    // Create a default object and pass values to it
    const email = { ...this.defaultOpts };
    email['html'] = template({
      name: data.name,
      email: data.email,
      date: `${Date().toString()}`,
      rootMatrix: data.rootMatrix.replace(/]./g, ']|').split('|'),
      matrixQ1: data.matrixQ1.replace(/]./g, ']|').split('|'),
      matrixQ1S2: data.matrixQ1S2.replace(/]./g, ']|').split('|'),
      matrixQ1S3: data.matrixQ1S3.replace(/]./g, ']|').split('|'),
      Q1S5: data.Q1S5,
      matrixQ2: data.matrixQ2.replace(/]./g, ']|').split('|'),
      matrixQ3: data.matrixQ3.replace(/]./g, ']|').split('|'),
    });

    this.logger.info(`${this.name} SendMail -> Req Ip ${ip} - Sending emails`);
    this.transporter.sendMail(email, error => {
      if (error) {
        this.logger.error(
          `${this.name} SendMail -> Req Ip ${ip} - Email not sent (error ${error})`,
        );
        throw new ServiceUnavailableException(
          `Some error ocurred with nodemailer: ${error}. Please, sent a message to researches`,
        );
      } else
        this.logger.info(`${this.name} SendMail -> Req Ip ${ip} - Email sent`);
    });
  }
}
