import { Hasher } from "../../../core/ports/hasher";
import BcrytpHasher from "./bcrypt.hasher";

describe('Bcrypt Hasher', () => {

    let hasher: Hasher

    beforeAll(() => {
        hasher = new BcrytpHasher();
    })

    test('should hash a password', async () => {
        const password = 'password-tests'
        const hashedPassword = hasher.hash(password)
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toBe(password)
    })

    test('should compare password with its hash', async () => {
        const password = 'password-test-to-compare'
        const hashedPassowrd = await hasher.hash(password);
        const isValidPassword = await hasher.compare(password, hashedPassowrd);
        expect(isValidPassword).toBeTruthy()
    })

    test('should compare and returns false for a invalid password', async () => {
        const password = 'password-test-to-compare'
        const wrongPassword = 'password-test-to-compare'
        const hashedPassowrd = await hasher.hash(password);
        const isValidPassword = await hasher.compare(hashedPassowrd, wrongPassword);
        expect(isValidPassword).toBeFalsy()
    })

})