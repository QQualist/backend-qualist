import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeders/seeder.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //Seeders
  const seederService = app.get(SeederService);
  await seederService.seed();

  const config = new DocumentBuilder()
    .setTitle('Qualist API')
    .setDescription(
      'API to support quality audits. Provides functionalities to manage and monitor audit processes.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
