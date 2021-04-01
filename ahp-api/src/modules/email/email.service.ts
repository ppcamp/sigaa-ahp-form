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
import { json } from 'express';

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
      from: 'Formulário SIGAA <sigaaForm@noreplay.com>', // sender address
      to: 'p.augustocampos@gmail.com',
      subject: 'Competências: ',
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

  emailPromise(ip: string, email: {}) {
    this.logger.info(`${this.name} SendMail -> Req Ip ${ip} - Sending emails`);

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(email, error => {
        if (error) {
          reject(
            `${this.name} SendMail -> Req Ip ${ip} - Email not sent (error ${error})`,
          );
        } else {
          resolve(`${this.name} SendMail -> Req Ip ${ip} - Email sent`);
        }
      });
    });
  }

  /**
   * Send mail to researches
   * @param {string} ip User ip
   * @param {SendEmailDTO} data The data got it from form page
   * @return Void
   * @throws 503 If message couldn't be sent
   */
  async sendMail(ip: string, data: SendEmailDTO): Promise<void> {
    const date = `${new Date()}`;

    // Create a handlebars to this section
    var source = fs.readFileSync(
      path.join(this.hbsViews, 'form.handlebars'),
      'utf8',
    );
    const template = Handlebars.compile(source);

    // Create a default object and pass values to it
    const email = { ...this.defaultOpts };
    // update subject
    email['subject'] += data.name;

    // insert others infos
    const data2send = {
      name: data.name,
      email: data.email,
      date: date,
      rootMatrix: data.rootMatrix
        .replace(/]./g, ']|')
        .split('|')
        .slice(0, -1),
      matrixQ1: data.matrixQ1
        .replace(/]./g, ']|')
        .split('|')
        .slice(0, -1),
      matrixQ1S2: data.matrixQ1S2
        .replace(/]./g, ']|')
        .split('|')
        .slice(0, -1),
      matrixQ1S3: data.matrixQ1S3
        .replace(/]./g, ']|')
        .split('|')
        .slice(0, -1),
      Q1S5: data.Q1S5,
      matrixQ2: data.matrixQ2
        .replace(/]./g, ']|')
        .split('|')
        .slice(0, -1),
      matrixQ3: data.matrixQ3
        .replace(/]./g, ']|')
        .split('|')
        .slice(0, -1),
    };

    email['html'] = template(data2send);

    // create a promise like
    await this.emailPromise(ip, email)
      .then(this.logger.info)
      .catch((err: string) => {
        this.logger.error(err);
        // ** also, create a local file with this response **

        // get current path
        const localPath = path.join(process.cwd(), '..');
        // filename
        let fileName = path.join(localPath, data.name + '.json');
        if (fs.existsSync(fileName)) {
          fileName = fileName.slice(0, -5) + '_.json';
        }
        // write output to a specific file
        fs.writeFile(
          fileName,
          JSON.stringify(data2send),
          { encoding: 'utf8' },
          err => {
            if (err) {
              return this.logger.error(
                'The function failed to send email and failed to save the data.',
              );
            } else {
              this.logger.debug(
                `Function failed to send email. However you can see a copy at: ${fileName}`,
              );
            }
          },
        );
        throw new ServiceUnavailableException(err);
      });
  }

  /**
   * Send mail to researches
   * @param {string} ip User ip
   * @param {SendEmailDTO} data The data got it from form page
   * @param {string} subject Note to put in subject
   * @return Void
   * @throws 503 If message couldn't be sent
   */
  async sendMailWithSubject(
    ip: string,
    data: SendEmailDTO,
    subject: string,
  ): Promise<void> {
    const date = `${new Date()}`;

    // Create a handlebars to this section
    var source = fs.readFileSync(
      path.join(this.hbsViews, 'form.handlebars'),
      'utf8',
    );
    const template = Handlebars.compile(source);

    // Create a default object and pass values to it
    const email = { ...this.defaultOpts };
    // update subject
    email['subject'] += `${subject} : ${data.name}`;

    // insert others infos
    let data2send = {
      name: data.name,
      email: data.email,
      date: date,
    };

    if (data.rootMatrix) {
      data2send['rootMatrix'] = data.rootMatrix
        .replace(/]./g, ']|')
        .split('|')
        .slice(0, -1);
    }
    if (data.matrixQ1) {
      data2send['matrixQ1'] = data.matrixQ1
        .replace(/]./g, ']|')
        .split('|')
        .slice(0, -1);
    }
    if (data.matrixQ1S2) {
      data2send['matrixQ1S2'] = data.matrixQ1S2
        .replace(/]./g, ']|')
        .split('|')
        .slice(0, -1);
    }
    if (data.matrixQ1S3) {
      data2send['matrixQ1S3'] = data.matrixQ1S3
        .replace(/]./g, ']|')
        .split('|')
        .slice(0, -1);
    }
    if (data.Q1S5) {
      data2send['Q1S5'] = data.Q1S5;
    }
    if (data.matrixQ2) {
      data2send['matrixQ2'] = data.matrixQ2
        .replace(/]./g, ']|')
        .split('|')
        .slice(0, -1);
    }
    if (data.matrixQ3) {
      data2send['matrixQ3'] = data.matrixQ3
        .replace(/]./g, ']|')
        .split('|')
        .slice(0, -1);
    }

    email['html'] = template(data2send);

    // create a promise like
    await this.emailPromise(ip, email)
      .then(this.logger.info)
      .catch((err: string) => {
        this.logger.error(err);
        // ** also, create a local file with this response **

        // get current path
        const localPath = path.join(process.cwd(), '..');
        // filename
        let fileName = path.join(localPath, data.name + '.json');
        if (fs.existsSync(fileName)) {
          fileName = fileName.slice(0, -5) + '_.json';
        }
        // write output to a specific file
        fs.writeFile(
          fileName,
          JSON.stringify(data2send),
          { encoding: 'utf8' },
          err => {
            if (err) {
              return this.logger.error(
                'The function failed to send email and failed to save the data.',
              );
            } else {
              this.logger.debug(
                `Function failed to send email. However you can see a copy at: ${fileName}`,
              );
            }
          },
        );
        throw new ServiceUnavailableException(err);
      });
  }
}
