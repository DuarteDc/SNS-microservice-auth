import User from "./user";

describe('test user entity', () => {

    test('create a instance of user', () => {


        const user = new User('12345684', 'email@gmail.com', 'password');

        expect(user).toBeInstanceOf(User);
        expect(user.id).toBe(expect.any(String))
        expect(user.email).toBe(expect.any(String))
        expect(user.passowrd).toBe(expect.any(String))

    })

})