import { User } from "../entities/User";

interface IUserGetter {
    get(id: number): Promise<User | null>;
    getAll(): Promise<Array<User | null>>;
    getByEmail(email: string): Promise<User | null>;
}

export { IUserGetter };