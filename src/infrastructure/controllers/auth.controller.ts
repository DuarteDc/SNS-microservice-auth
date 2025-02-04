import { Request, Response } from "express";
import RegisterUser from "../../application/useCases/register.user";

export default class AuthController {

    constructor(private readonly registerUser: RegisterUser) { }

    async register(request: Request, response: Response) {
        const { email, password } = request.body;
        try {
            await this.registerUser.execute(email, password);
            response.status(201).json({ message: 'User registered successfully' })
        } catch (error: unknown) {
            response.status(422).json({ error: (<Error>error).message });
        }
    }

}