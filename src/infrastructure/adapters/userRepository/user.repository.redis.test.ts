import RedisService from "../../service/redis.service";
import UserRepositoryRedis from "./user.repository.redis";
import User from "../../../core/domain/user";

describe('User Repository - Redis Integration', () => {

    const redisService = new RedisService()
    let userRepository: UserRepositoryRedis;
    beforeAll(async () => {
        userRepository = new UserRepositoryRedis(redisService)
    })

    afterAll(async () => {
        await redisService.client.del(`user:duarte@test.com`)
        await redisService.client.del(`user:duarte@test.save.com`)
    })

    test('should return null if user dont exist', async () => {
        const user = await userRepository.findByEmail(`random.email${new Date().getTime()}@gmail.com`)
        expect(user).toBe(null)
    });

    test('should create a new user and returns true', async () => {
        const user = new User('1234', 'duarte@test.com', 'password');
        const newUser = await userRepository.save(user)
        expect(newUser).toBeTruthy()
    })

    test('should return user saved in redis', async () => {
        const user = new User('1234', 'duarte@test.save.com', 'password');
        await userRepository.save(user)
        const existUser = await userRepository.findByEmail(user.email)
        expect(existUser).not.toBe(null)
        expect(existUser?.id).toBe(user.id)
        expect(existUser?.email).toBe(user.email)
    })

})