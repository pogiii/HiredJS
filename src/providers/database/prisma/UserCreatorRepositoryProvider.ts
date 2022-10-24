import { IUserCreatorRepositoryProvider } from "../../../contracts/interfaces/IUserCreatorRepositoryProvider";
import { BaseRepositoryProvider } from "./BaseRepositoryProvider";

class UserCreatorRepositoryProvider extends BaseRepositoryProvider implements IUserCreatorRepositoryProvider {
    async create(email: string, first_name: string, last_name: string, password_hash: string, salt: string): Promise<void> {
        await this._prisma.user.create({
            data: {
                email: email,
                first_name: first_name,
                last_name: last_name,
                password_hash: password_hash,
                salt: salt
            }
        })
    };
}

export { UserCreatorRepositoryProvider };