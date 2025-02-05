import RedisService from "../../service/redis.service";
import UserRepositoryRedis from "./user.repository.redis";
import User from "../../../core/domain/user";

describe('User Repository - Redis Integration', () => {

    const redisService = new RedisService()
    let userRepository: UserRepositoryRedis;
    beforeAll(async () => {
        userRepository = new UserRepositoryRedis(redisService)
    })

    test('should create a new user inside database', async () => {

        const user = new User('1234', 'duarte@test.com', 'password');

    })

})