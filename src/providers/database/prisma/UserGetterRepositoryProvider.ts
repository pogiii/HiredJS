import { User } from "../../../contracts/entities/User";
import { IUserGetterRepositoryProvider } from "../../../contracts/interfaces/IUserGetterRepositoryProvider";
import { BaseRepositoryProvider } from "./BaseRepositoryProvider";

class UserGetterRepositoryProvider extends BaseRepositoryProvider implements IUserGetterRepositoryProvider {

    async get(id: number): Promise<User | null> {
        return await this._prisma.user.findUnique({
            where: { id: id }
        });
    }

    async getByEmail(email: string): Promise<User | null> {
        return await this._prisma.user.findUnique({
            where: { email: email }
        });
    }

    async getAll(): Promise<User[]> {
        return await this._prisma.user.findMany();
    }

}

export { UserGetterRepositoryProvider }