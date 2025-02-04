import { Router } from 'express';
import AuthController from '../../../controllers/auth.controller';
import RegisterUser from '../../../../application/useCases/register.user';
import UuidGenerator from '../../../adapters/idGenerator/uuidGenerator';
import BcrytpHasher from '../../../adapters/hasher/bcrypt.hasher';
import UserRepositoryRedis from '../../../adapters/userRepository/user.repository.redis';
import RedisService from '../../../service/redis.service';

const authRouter = Router()

const redisService = new RedisService()
const userRepository = new UserRepositoryRedis(redisService);
const hasher = new BcrytpHasher();
const idGenerator = new UuidGenerator();
const registerUser = new RegisterUser(userRepository, hasher, idGenerator);


const authController = new AuthController(registerUser);

authRouter.post("/register", authController.register.bind(authController));

export default authRouter;