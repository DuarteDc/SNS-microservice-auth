export interface Hasher {
    hash(password: string): Promise<string>
    compare(password: string, hashedPassowrd: string): Promise<boolean>
}