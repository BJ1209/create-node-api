import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string(),
  ENV: z.string(),
  MONGO_URI: z.string()
});

const createEnv = (env: NodeJS.ProcessEnv) => {
  const safeParseEnv = envSchema.safeParse(env);

  if (!safeParseEnv.success) {
    throw new Error("Invalid Environment Variables");
  }

  return safeParseEnv.data;
};

export const env = createEnv(process.env); 