import { User } from "../contracts/entities/User";
import { IUserGetter } from "../contracts/interfaces/IUserGetter";
import { IUserGetterRepositoryProvider } from "../contracts/interfaces/IUserGetterRepositoryProvider"
import { Logger } from "pino"
import { validateEmail } from "../scripts/validateEmail";
class UserGetter implements IUserGetter {
    
    private readonly _logger: Logger
    private readonly _userGetterRepositoryProvider: IUserGetterRepositoryProvider

    constructor(logger: Logger, userGetterRepositoryProvider: IUserGetterRepositoryProvider) {
        this._logger = logger;
        this._userGetterRepositoryProvider = userGetterRepositoryProvider
    }

    async get(id: number): Promise<User | null> {
        return await this._userGetterRepositoryProvider.get(id)
        .catch(e => {
            this._logger.error(e.message ?? e, "Could not get user");
            return null;
        })
    }

    async getAll(): Promise<(User | null)[]> {
        return await this._userGetterRepositoryProvider.getAll()
        .catch(e => {
            this._logger.error(e.message ?? e, "Could not get users");
            return [null];
        })
    }

    async getByEmail(email: string): Promise<User | null> {
        if (email.length < 1 || !validateEmail(email)) {
            const msg = "Email is not valid!";
            this._logger.error({}, msg)
            throw msg;
        }

        return await this._userGetterRepositoryProvider.getByEmail(email)
            .catch(e => {
                this._logger.error(e.message ?? e, "Could not get user");
                return null;
            })
    }


}

export { UserGetter }