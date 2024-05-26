import { Module } from '@nestjs/common';
import { DepartamentsService } from './departaments.service';
import { DepartamentsController } from './departaments.controller';

@Module({
  controllers: [DepartamentsController],
  providers: [DepartamentsService],
})
export class DepartamentsModule {}
