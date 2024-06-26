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
import { ResponsiblesModule } from './responsibles/responsibles.module';
import { MailingModule } from './mailing/mailing.module';
import { UserTypesModule } from './user_types/user_types.module';
import { RolesModule } from './roles/roles.module';
import { AuditStatusModule } from './audit_status/audit_status.module';
import { AuditsModule } from './audits/audits.module';
import { RemindersModule } from './reminders/reminders.module';
import { AuditRemindersModule } from './audit_reminders/audit_reminders.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ItemStatusModule } from './item_status/item_status.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'qualist',
      username: 'root',
      password: 'bancodedados',
      ssl: false,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    DepartamentsModule,
    SeedModule,
    AuthModule,
    ChecklistsModule,
    PrioritiesModule,
    ItemsModule,
    RiskTypesModule,
    ResponsiblesModule,
    MailingModule,
    UserTypesModule,
    RolesModule,
    AuditStatusModule,
    AuditsModule,
    RemindersModule,
    AuditRemindersModule,
    ItemStatusModule,
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
