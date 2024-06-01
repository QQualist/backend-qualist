import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentsModule } from './departaments/departaments.module';
import { SeedModule } from './seeders/seed.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { ChecklistsModule } from './checklists/checklists.module';
import { PrioritiesModule } from './priorities/priorities.module';
import { ItemsModule } from './items/items.module';
import { RiskTypesModule } from './risk_types/risk_types.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      database: process.env.MYSQL_DATABASE,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      ssl: String(process.env.MYSQL_SSL).toLowerCase() === 'true',
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    UsersModule,
    DepartamentsModule,
    SeedModule,
    AuthModule,
    ChecklistsModule,
    PrioritiesModule,
    ItemsModule,
    RiskTypesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
