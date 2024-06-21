import { Injectable, Logger } from '@nestjs/common';
import { RiskTypesService } from '../risk_types/risk_types.service';
import { UserTypesService } from '../user_types/user_types.service';
import { AuditStatusService } from '../audit_status/audit_status.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly riskTypeService: RiskTypesService,
    private readonly userTypeService: UserTypesService,
    private readonly auditStatusService: AuditStatusService,
  ) {}

  async seed() {
    this.logger.log('Starting seeding process...');

    await this.riskTypeService.seed();
    await this.userTypeService.seed();
    await this.auditStatusService.seed();

    this.logger.log('Seeding process finished.');
  }
}
