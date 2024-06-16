import { Module } from '@nestjs/common';
import { ResponsiblesService } from './responsibles.service';
import { ResponsiblesController } from './responsibles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Responsible } from './entities/responsible.entity';
import { UsersModule } from '../users/users.module';
import { MailingService } from '../mailing/mailing.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Responsible])],
  controllers: [ResponsiblesController],
  providers: [ResponsiblesService, MailingService],
})
export class ResponsiblesModule {}
