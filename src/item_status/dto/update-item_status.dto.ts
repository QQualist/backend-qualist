import { PartialType } from '@nestjs/swagger';
import { CreateItemStatusDto } from './create-item_status.dto';

export class UpdateItemStatusDto extends PartialType(CreateItemStatusDto) {}
