import { Injectable, Logger } from '@nestjs/common';
import { RiskTypeSeedService } from './risk-type-seed.service';
import { UserTypeSeedService } from './user-type-seed.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly riskTypeSeedService: RiskTypeSeedService,
    private readonly userTypeSeedService: UserTypeSeedService,
  ) {}

  async seed() {
    this.logger.log('Starting seeding process...');

    await this.riskTypeSeedService.seed();
    await this.userTypeSeedService.seed();

    this.logger.log('Seeding process finished.');
  }
}
