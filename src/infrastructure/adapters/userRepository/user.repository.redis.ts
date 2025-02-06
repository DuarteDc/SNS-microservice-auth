import User from "../../../core/domain/user";
import { UserRepository } from "../../../core/ports/user.repository";

import RedisService from "../../service/redis.service";

export default class UserRepositoryRedis implements UserRepository {

    constructor(private readonly redisService: RedisService) {
        this.redisService.connect()
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.redisService.client.hGetAll(`user:${email}`);
        if (Object.keys(user).length === 0 || !user) {
            return null
        }
        return new User(user.id, user.email, user.password)
    }

    async save(user: User): Promise<boolean> {
        try {
            await this.redisService.client.hSet(`user:${user.email}`, { ...user })
            return true;
        } catch (error) {
            return false
        }
    }

}