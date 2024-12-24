import Config from 'react-native-config';
import * as z from 'zod';

const createEnv = () => {
  console.log(Config.API_URL);
  const EnvSchema = z.object({
    API_URL: z.string(),
  });

  const parsedEnv = EnvSchema.safeParse(Config);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided. The following variables are missing or invalid:
      ${Object.entries(parsedEnv.error.flatten().fieldErrors)
        .map(([k, v]) => `- ${k}: ${v}`)
        .join('\n')}
      `,
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
