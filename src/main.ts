import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeders/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Seeders
  const seederService = app.get(SeederService);
  await seederService.seed();

  await app.listen(3000);
}
bootstrap();
