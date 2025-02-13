import User from "./user";

describe('test user entity', () => {

    test('create a instance of user', () => {
        const user = new User('12345684', 'email@gmail.com', 'password');

        expect(user).toBeInstanceOf(User);
        expect(user.id).toEqual(expect.any(String))
        expect(user.email).toEqual(expect.any(String))
        expect(user.password).toEqual(expect.any(String))
    })

})