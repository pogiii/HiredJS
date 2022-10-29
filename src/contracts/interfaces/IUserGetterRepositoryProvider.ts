import { User } from "../entities/User";

interface IUserGetterRepositoryProvider {
    get(id: number): Promise<User | null>;
    getAll(): Promise<User[]>;
    getByEmail(email: string): Promise<User | null>
}

export { IUserGetterRepositoryProvider }