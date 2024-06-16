import { Module } from '@nestjs/common';
import { UserTypesService } from './user_types.service';
import { UserTypesController } from './user_types.controller';

@Module({
  controllers: [UserTypesController],
  providers: [UserTypesService],
})
export class UserTypesModule {}
