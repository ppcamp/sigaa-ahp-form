import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { EmailModule } from '../modules/email/email.module';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { INQUIRER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmailModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.simple(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              info => `[${info.timestamp}] ${info.level} ${info.message}`,
            ),
          ),
          // The maximum file size in bytes (10mb)
          maxsize: 10e6,
          maxFiles: 5,
          filename: `${__dirname}/../logs/log.log`,
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.simple(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.colorize(),
            winston.format.printf(
              info => `[${info.timestamp}] ${info.level} ${info.message}`,
            ),
          ),
          level: 'debug',
        }),
      ],
    }),
  ],
})
export class AppModule {}
