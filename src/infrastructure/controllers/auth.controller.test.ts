import { Request, Response } from "express"

import RegisterUser from "../../application/useCases/register.user"
import AuthController from "./auth.controller"

describe('Auth Controller', () => {

    let authController: AuthController
    let mockRegisterUser: jest.Mocked<RegisterUser>;
    let request: Partial<Request>
    let response: Partial<Response>

    beforeAll(() => {
        mockRegisterUser = {
            execute: jest.fn()
        } as unknown as jest.Mocked<RegisterUser>

        authController = new AuthController(mockRegisterUser)
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


})