import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    REDIS_PASSWORD: env.get('REDIS_PASSWORD').required().asString(),
    REDIS_PORT: env.get('REDIS_PORT').required().asPortNumber(),
    REDIS_DATABASE: env.get('REDIS_DATABASE').required().asString(),
    REDIS_HOST: env.get('REDIS_HOST').required().asString(),
    REDIS_URL: env.get('REDIS_HOST').required().asString(),
};
