import { BaseRepositoryProvider } from "./BaseRepositoryProvider";
import { IUserUpdaterRepositoryProvider } from "../../../contracts/interfaces/IUserUpdaterRepositoryProvider"

class UserUpdaterRepositoryProvider extends BaseRepositoryProvider implements IUserUpdaterRepositoryProvider {
    async update(id: number, options: { email?: string | undefined; first_name?: string | undefined; last_name?: string | undefined; password_hash?: string | undefined; salt?: string | undefined; }): Promise<void> {
        await this._prisma.user.update({
            where: {id: id},
            data: options
        })
    }
}

export {UserUpdaterRepositoryProvider}