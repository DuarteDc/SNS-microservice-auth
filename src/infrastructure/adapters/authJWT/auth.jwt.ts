import jwt from 'jsonwebtoken';
import { SessionToken } from '../../../core/ports/session.token';

export default class AuthJWT implements SessionToken {

    token(userId: string) {
        return jwt.sign({ data: userId }, 'secret-key', { expiresIn: '1h' });
    };

    verify(token: string): string {
        return jwt.verify(token, 'secret-key') as string
    }
}