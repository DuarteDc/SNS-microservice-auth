import { createClient, type RedisClientType } from 'redis';
import { envs } from '../config/config';

export default class RedisService {

    public client: RedisClientType;

    constructor() {
        this.client = createClient({
            socket: {
                host: envs.REDIS_HOST,
                port: envs.REDIS_PORT,
            },
            password: envs.REDIS_PASSWORD
        });
    }

    async connect() {
        await this.client?.connect()
        this.client.on('error', err => console.error(`Redis Error: ${err}`))
        this.client.on('connect', () => console.info('Redis connected'))
        this.client.on('reconnecting', () => console.info('Redis reconnecting'))
        this.client.on('ready', () => {
            console.info('Redis ready!')
        })
    }

}