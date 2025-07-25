// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
