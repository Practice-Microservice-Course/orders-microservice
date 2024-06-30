import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
}

const envVarsSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NATS_SERVERS: Joi.array().items(Joi.string()).required(),
}).unknown(true);

const { error, value } = envVarsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  NATS_SERVERS: envVars.NATS_SERVERS,
};
