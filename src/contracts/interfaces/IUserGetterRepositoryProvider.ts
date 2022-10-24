import { User } from "../entities/User";

interface IUserGetterRepositoryProvider {
    get(id: number): Promise<User>;
}

export { IUserGetterRepositoryProvider }