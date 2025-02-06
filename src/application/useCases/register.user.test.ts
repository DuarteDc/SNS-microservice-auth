import User from "../../core/domain/user";
import { Hasher } from "../../core/ports/hasher";
import { IdGenerator } from "../../core/ports/id.generator";
import { UserRepository } from "../../core/ports/user.repository";
import RegisterUser from "./register.user";

describe('Register user UseCase', () => {

    let registerUser: RegisterUser;
    let userRepository: jest.Mocked<UserRepository>;
    let hasher: jest.Mocked<Hasher>;
    let uuidGenerator: jest.Mocked<IdGenerator>;

    beforeAll(() => {
        userRepository = {
            findByEmail: jest.fn(),
            save: jest.fn()
        }
        hasher = {
            hash: jest.fn(),
            compare: jest.fn()
        }

        uuidGenerator = {
            generate: jest.fn()
        }

        registerUser = new RegisterUser(userRepository, hasher, uuidGenerator)
    })


    test('should register user succesfully', async () => {
        userRepository.findByEmail.mockResolvedValue(null)
        hasher.hash.mockResolvedValue('hashedpassword')
        uuidGenerator.generate.mockReturnValue('uuid-123456789')
        userRepository.save.mockResolvedValue(true)

        const result = await registerUser.execute('duarte@gmail.com', 'password')

        expect(userRepository.findByEmail).toHaveBeenCalledWith('duarte@gmail.com')
        expect(hasher.hash).toHaveBeenCalledWith('password')
        expect(uuidGenerator.generate).toHaveBeenCalled()
        expect(userRepository.save).toHaveBeenCalledWith(new User('uuid-123456789', 'duarte@gmail.com', 'hashedpassword'))

        expect(result).toBe(true)
    })

    test('should fails to register user if user already exists', async () => {
        userRepository.findByEmail.mockResolvedValue(new User('123', 'duarte@gmail.com', 'hashedpassword'))
        await expect(registerUser.execute('duarte@gmail.com', 'password'))
            .rejects.toThrow('User already exists')

        expect(userRepository.findByEmail).toHaveBeenCalledWith('duarte@gmail.com')
        expect(hasher.hash).not.toHaveBeenCalled()
        expect(uuidGenerator.generate).not.toHaveBeenCalled()
        expect(userRepository.save).not.toHaveBeenCalled()
    })


    test('should returns false if an error occurs', async () => {
        userRepository.findByEmail.mockResolvedValue(null)
        hasher.hash.mockResolvedValue('hashedpassword')
        uuidGenerator.generate.mockReturnValue('uuid-123456789')
        userRepository.save.mockResolvedValue(false)

        const result = await registerUser.execute('duarte@gmail.com', 'password')
        expect(result).toBe(false)
    })

})  
