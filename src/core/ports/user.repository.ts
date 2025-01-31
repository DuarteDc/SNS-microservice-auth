import User from "../domain/user"

export interface UserRepository {
    findByEmail: (email: string) => User
    save: (user: User) => void
}