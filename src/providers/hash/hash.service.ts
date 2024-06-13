import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  constructor(private configService: ConfigService) {}

  async hash(valueToBeHashed: string): Promise<string> {
    const salt = this.configService.get<number>('hash.salt');
    const hashedValue = await bcrypt.hash(valueToBeHashed, salt);
    return hashedValue;
  }

  async compare(
    valueToBeCompared: string,
    hashedValue: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(valueToBeCompared, hashedValue);
    return isMatch;
  }
}
