import { createClient, type RedisClientType } from 'redis';


export default class RedisService {

    public client: RedisClientType;

    constructor() {
        this.client = createClient();
    }

    async connect() {
        this.client.on('error', err => console.error(`Redis Error: ${err}`))
        this.client.on('connect', () => console.info('Redis connected'))
        this.client.on('reconnecting', () => console.info('Redis reconnecting'))
        this.client.on('ready', () => {
            console.info('Redis ready!')
        })
        await this.client?.connect()
    }

}