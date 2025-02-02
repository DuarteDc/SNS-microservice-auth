import { Request, Response } from "express";
import RegisterUser from "../../application/useCases/register.user";

export default class AuthController {

    constructor(private readonly registerUser: RegisterUser) { }

    async register(request: Request, response: Response) {
        const { email, passoword } = request.body;
        try {
            await this.registerUser.execute(email, passoword);
            response.status(201).json({ message: 'User registered successfully' })
        } catch (error) {
            response.status(400).json({ error: error });
        }
    }

}