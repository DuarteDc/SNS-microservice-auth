import User from "../../../core/domain/user";
import { UserRepository } from "../../../core/ports/user.repository";

import RedisService from "../../service/redis.service";

export default class UserRedisRepository implements UserRepository {

    constructor(private readonly redisService: RedisService) {
        this.redisService.connect()
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.redisService.client.hGetAll(`user:${email}`);
        if (!user)
            return null

        return new User(user.id, user.email, user.password)
    }

    async save(user: User): Promise<void> {
        this.redisService.client.hSet(`user:${user.email}`, { ...user })
    }

}