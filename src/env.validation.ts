import { plainToInstance } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsPort, IsString, IsStrongPassword, validateSync } from 'class-validator';

// Class responsible for checking that environment variables are set correctly
class EnvironmentVariables {
  @IsString()
  JWT_SECRET: string;

  @IsString()
  MYSQL_DATABASE: string;

  @IsString()
  MYSQL_HOST: string;

  @IsString()
  MYSQL_PASSWORD: string;

  @IsNumber()
  @IsInt()
  MYSQL_PORT: number;

  @IsBoolean()
  MYSQL_SSL: boolean;

  @IsString()
  MYSQL_USER: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
