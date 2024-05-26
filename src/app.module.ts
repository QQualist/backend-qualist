import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentsModule } from './departaments/departaments.module';
import { SeedModule } from './seeders/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'qualist',
      username: 'root',
      password: 'bancodedados',
      synchronize: true, //Just in development environment
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    UsersModule,
    DepartamentsModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
