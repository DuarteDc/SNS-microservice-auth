import RedisService from './redis.service';
import { createClient, RedisClientType } from 'redis';
jest.mock('redis', () => ({
    createClient: jest.fn()
}))
describe('Redis Service', () => {

    let mockClient: Partial<RedisClientType>;

    beforeEach(() => {
        // Creamos un mock para el cliente de Redis
        mockClient = {
            on: jest.fn(),
            connect: jest.fn().mockResolvedValue(undefined),
        };

        // Asignamos el mock a `createClient`
        (createClient as jest.Mock).mockReturnValue(mockClient);
    });

    test('should create instance a RedisClient', () => {

        (createClient as jest.Mock).mockReturnValueOnce({
            on: jest.fn(),
            connect: jest.fn()
        })
        const redisService = new RedisService()
        expect(createClient).toHaveBeenCalledTimes(1)
        expect(redisService.client).toBeDefined()
    })


    test('should try to connect redis successfully', async () => {
        const redisService = new RedisService()
        await redisService.connect()

        // expect(mockClient).toHaveBeenCalledWith('error', expect.any(Function))
        expect(mockClient).toHaveBeenCalledWith('connect', expect.any(Function))
        expect(mockClient).toHaveBeenCalledWith('reconnecting', expect.any(Function))
        expect(mockClient).toHaveBeenCalledWith('ready', expect.any(Function))

        expect(mockClient.connect).toHaveBeenCalledTimes(1)

    })

})