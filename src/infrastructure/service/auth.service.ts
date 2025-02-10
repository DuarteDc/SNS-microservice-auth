import User from "../../core/domain/user";
import { SessionToken } from "../../core/ports/session.token";

export default class AuthService {

    constructor(private readonly sessionToken: SessionToken) { }

    createSession(user: User) {
        return this.sessionToken.token(user.id);
    }

    verifySession(token: string) {
        const isValidToken = this.sessionToken.verify(token);
        if (!isValidToken)
            return false;
        return true
    }
}