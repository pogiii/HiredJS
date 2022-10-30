import { IUserDeleter } from "../contracts/interfaces/IUserDeleter";
import { Logger } from "pino";
import { IUserDeleterRepositoryProvider } from "../contracts/interfaces/IUserDeleterRepositoryProvider";
class UserDeleter implements IUserDeleter {

    private readonly _logger: Logger
    private readonly _userDeleterRepositoryProvider: IUserDeleterRepositoryProvider

    constructor(logger: Logger, userDeleterRepositoryProvider: IUserDeleterRepositoryProvider) {
        this._logger = logger;
        this._userDeleterRepositoryProvider = userDeleterRepositoryProvider;
    }

    async delete(id: number): Promise<void> {
        await this._userDeleterRepositoryProvider.delete(id)
        .catch(e => {
            this._logger.error(e.message ?? e, "Could not delete user");
        })
    }

}

export { UserDeleter }