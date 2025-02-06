import bcrypt from 'bcrypt';
import { Hasher } from '../../../core/ports/hasher';

export default class BcrytpHasher implements Hasher {

    async hash(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds)
    }

    async compare(password: string, hashedPassowrd: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassowrd)
    }

}