import { v4 as uuidv4 } from 'uuid';
import { IdGenerator } from '../../../core/ports/idGenerator';

export default class UuidGenerator implements IdGenerator {
    generate(): string {
        return uuidv4()
    }

}