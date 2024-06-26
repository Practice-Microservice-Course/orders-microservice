import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  PORT: number;
}

const envVarsSchema = Joi.object({
  PORT: Joi.number().default(3000),
}).unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,
};
