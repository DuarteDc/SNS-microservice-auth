import { Request, Response } from "express";
import RegisterUser from "../../application/useCases/register.user";
import LoginUser from "../../application/useCases/login.user";
import AuthService from "../service/auth.service";

export default class AuthController {

    constructor(private readonly registerUser: RegisterUser, private readonly loginUser: LoginUser, private readonly authService: AuthService) { }

    async login(request: Request, response: Response) {
        const { email, password } = request.body;
        try {
            const user = await this.loginUser.execute(email, password);
            const token = await this.authService.createSession(user);
            const userSession = {
                ...user,
                token
            }
            response.status(200).json({ user: userSession })
        } catch (error) {
            response.status(400).json({ error: (<Error>error).message });
        }
    }

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