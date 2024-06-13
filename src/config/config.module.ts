import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import databaseConfig from '../database/database.config';
import hashConfig from '../providers/hash/hash.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, hashConfig],
    }),
  ],
})
export class ConfigModule {}
