import { PartialType } from '@nestjs/swagger';
import { CreateRiskTypeDto } from './create-risk_type.dto';

export class UpdateRiskTypeDto extends PartialType(CreateRiskTypeDto) {}
