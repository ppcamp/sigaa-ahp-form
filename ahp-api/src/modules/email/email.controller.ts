import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { IpAddress } from '../utils/decorators';
import { SendEmailDTO } from './dtos/SendEmailDTO';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiOperation({
    summary: 'Get status from email module',
    description:
      'This method will raise a page containing informations about the email module',
  })
  @Get()
  async getInfosAboutThisModule(@IpAddress() ip): Promise<string> {
    return this.emailService.getInfos(ip);
  }

  @ApiOperation({
    summary: 'Send email to researches',
    description: 'This method will send the object to researches',
  })
  @Post()
  async sendMail(
    @IpAddress() ip,
    @Body(ValidationPipe) data: SendEmailDTO,
  ): Promise<void> {
    return this.emailService.sendMail(ip, data);
  }
}
