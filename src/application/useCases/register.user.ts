import User from "../../core/domain/user";
import { Hasher } from "../../core/ports/hasher";
import { IdGenerator } from "../../core/ports/id.generator";
import { UserRepository } from "../../core/ports/user.repository";

export default class RegisterUser {

    constructor(private readonly userRepository: UserRepository, private readonly hasher: Hasher, private readonly idGenerator: IdGenerator) { }

    async execute(email: string, password: string): Promise<boolean> {
        const existUser = await this.userRepository.findByEmail(email);

        if (existUser)
            throw new Error("User already exists")

        const hashedPassowrd = await this.hasher.hash(password)

        const id = this.idGenerator.generate()

        const newUser = new User(id, email, hashedPassowrd)
        return await this.userRepository.save(newUser)
    }

}