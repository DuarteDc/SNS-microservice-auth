import { Router } from 'express';
import AuthController from '../../../controllers/auth.controller';
import RegisterUser from '../../../../application/useCases/register.user';
import UuidGenerator from '../../../adapters/idGenerator/uuid.generator';
import BcrytpHasher from '../../../adapters/hasher/bcrypt.hasher';
import UserRepositoryRedis from '../../../adapters/userRepository/user.repository.redis';
import RedisService from '../../../service/redis.service';
import LoginUser from '../../../../application/useCases/login.user';
import AuthService from '../../../service/auth.service';
import AuthJWT from '../../../adapters/authJWT/auth.jwt';

const authRouter = Router()

const redisService = new RedisService()
const userRepository = new UserRepositoryRedis(redisService);
const hasher = new BcrytpHasher();
const idGenerator = new UuidGenerator();
const registerUser = new RegisterUser(userRepository, hasher, idGenerator);
const loginUser = new LoginUser(userRepository, hasher);
const authService = new AuthService(new AuthJWT())

const authController = new AuthController(registerUser, loginUser, authService);

authRouter
    .post("/login", authController.login.bind(authController))
    .post("/register", authController.register.bind(authController));

export default authRouter;