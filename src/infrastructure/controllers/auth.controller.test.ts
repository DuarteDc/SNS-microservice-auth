import { Request, Response } from "express"

import RegisterUser from "../../application/useCases/register.user"
import AuthController from "./auth.controller"
import LoginUser from "../../application/useCases/login.user"
import AuthService from "../service/auth.service"
import User from "../../core/domain/user"

describe('Auth Controller', () => {

    let authController: AuthController
    let mockRegisterUser: jest.Mocked<RegisterUser>;
    let mockLoginUser: jest.Mocked<LoginUser>;
    let mockAuthService: jest.Mocked<AuthService>
    let request: Partial<Request>
    let response: Partial<Response>

    beforeAll(() => {
        mockRegisterUser = {
            execute: jest.fn()
        } as unknown as jest.Mocked<RegisterUser>

        mockLoginUser = {
            execute: jest.fn()
        } as unknown as jest.Mocked<LoginUser>

        mockAuthService = {
            createSession: jest.fn(),
            verifySession: jest.fn(),
        } as unknown as jest.Mocked<AuthService>


        authController = new AuthController(mockRegisterUser, mockLoginUser, mockAuthService)
        request = {
            body: {
                "email": 'test@example.com',
                "password": 'password',
            }
        }

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    })


    beforeEach(() => jest.clearAllMocks())

    test('should register user and return 201', async () => {
        await authController.register(request as Request, response as Response)
        expect(mockRegisterUser.execute).toHaveBeenCalledWith("test@example.com", "password")
        expect(response.status).toHaveBeenCalledWith(201)
        expect(response.json).toHaveBeenCalledWith({
            message: 'User registered successfully'
        })
    })

    test('Should return 422 if registration fails', async () => {
        mockRegisterUser.execute.mockRejectedValue(new Error('User already exists'))
        await authController.register(request as Request, response as Response)
        expect(response.status).toHaveBeenCalledWith(422)
        expect(response.json).toHaveBeenCalledWith({
            error: 'User already exists'
        })
    })

    test('should authenticate user and return session token', async () => {
        const user = new User("123", 'test@example.com', 'password')
        const token = "new token"
        mockLoginUser.execute = jest.fn().mockReturnValue(Promise.resolve(user))
        mockAuthService.createSession = jest.fn().mockReturnValue(token)

        await authController.login(request as Request, response as Response)
        await expect(mockLoginUser.execute).toHaveBeenCalledWith(user.email, user.password)

        expect(mockAuthService.createSession).toHaveBeenCalledWith(user)
        expect(mockAuthService.createSession).toHaveReturnedWith(token)
        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.json).toHaveBeenCalledWith({ "user": { "token": token, ...user } })
    })

    test('should return 400 if login fails', async () => {
        mockLoginUser.execute.mockRejectedValue(new Error('User or password are not valid'))
        await authController.login(request as Request, response as Response)
        expect(response.status).toHaveBeenCalledWith(400)
        expect(response.json).toHaveBeenCalledWith({
            error: 'User or password are not valid'
        })
    })
})