import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: true });

  // Create api reference
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription(
      'Análise do perfil do aluno egresso do curso de Engenharia de Computação por meio de ferramenta de tomada de decisões aplicadas ao âmbito educacional',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // Main page of api reference
  SwaggerModule.setup('api', app, document);

  // Allowed requisition
  app.enableCors();

  // Set default logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Set handlebars configs
  // app.engine('views', path.join(__dirname, './views'));

  // Configure dotenv
  const configService = app.get(ConfigService);
  const host = configService.get<string>('HOST', '0.0.0.0');
  const port = configService.get<number>('PORT');

  // Start to listen
  await app.listen(port, host);

  const url = await app.getUrl();
}
bootstrap();
