import { Hasher } from "../../core/ports/hasher";
import { UserRepository } from "../../core/ports/user.repository";

export default class LoginUser {

    constructor(private readonly userRepository: UserRepository, private readonly hasher: Hasher) { }

    async execute(email: string, password: string) {

        const user = await this.userRepository.findByEmail(email);
        if (!user)
            throw new Error('User or password are not valid');

        const isValidPassword = await this.hasher.compare(password, user.password);
        if (!isValidPassword)
            throw new Error('User or password are not valid');

        return user;
    }

}