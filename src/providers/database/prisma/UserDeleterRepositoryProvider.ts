import { BaseRepositoryProvider } from "./BaseRepositoryProvider";
import { IUserDeleterRepositoryProvider } from "../../../contracts/interfaces/IUserDeleterRepositoryProvider"

class UserDeleterRepositoryProvider extends BaseRepositoryProvider implements IUserDeleterRepositoryProvider {
    
    async delete(id: number): Promise<void> {
        await this._prisma.user.delete({
            where: {
                id: id
            }
        })
    }

}

export { UserDeleterRepositoryProvider }