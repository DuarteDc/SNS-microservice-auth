import User from "../domain/user"

export interface UserRepository {
    findByEmail: (email: string) => Promise<User | null>
    save: (user: User) => Promise<void>
}