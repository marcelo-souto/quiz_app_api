import { registerAs } from '@nestjs/config';

export default registerAs('hash', () => ({
  salt: parseInt(process.env.HASH_SALT, 10),
}));
