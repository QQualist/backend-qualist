import { Injectable, Logger } from '@nestjs/common';
import { UserTypeSeedService } from './user-type-seed.service';
import { RiskTypesService } from 'src/risk_types/risk_types.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly riskTypeService: RiskTypesService,
    private readonly userTypeSeedService: UserTypeSeedService,
  ) {}

  async seed() {
    this.logger.log('Starting seeding process...');

    await this.riskTypeService.seed();
    await this.userTypeSeedService.seed();

    this.logger.log('Seeding process finished.');
  }
}
