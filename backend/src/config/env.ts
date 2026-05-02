import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  PORT: z.coerce.number().default(4100),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
});

export const env = envSchema.parse(process.env);
