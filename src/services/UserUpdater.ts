import { Logger } from "pino";
import { IUserUpdater } from "../contracts/interfaces/IUserUpdater";
import { IUserUpdaterRepositoryProvider } from "../contracts/interfaces/IUserUpdaterRepositoryProvider"
import { validateEmail } from "../scripts/validateEmail";
import { createHashFromString } from "../scripts/createHashFromString";

class UserUpdater implements IUserUpdater {

    private readonly _logger: Logger;
    private readonly _userUpdaterRepositoryProvider: IUserUpdaterRepositoryProvider;

    constructor(logger: Logger, userUpdaterRepositoryProvider: IUserUpdaterRepositoryProvider) {
        this._logger = logger;
        this._userUpdaterRepositoryProvider = userUpdaterRepositoryProvider;
    }

    async update(id: number, options: { email?: string | undefined; first_name?: string | undefined; last_name?: string | undefined; password?: string | undefined}): Promise<void> {
        
        if (Object.keys(options).length === 0) {
            const msg = "Options object cannot be empty!";
            this._logger.error({}, msg);
            throw msg;
        }

        if (options?.email && (!validateEmail(options.email) || options.email.length < 1)) {
            const msg = "Email is not valid!";
            this._logger.error({}, msg);
            throw msg;
        }

        if (options?.first_name?.length == 0) {
            const msg = "First name is not valid!"
            this._logger.error({}, msg);
            throw msg;
        }

        if (options?.last_name?.length == 0) {
            const msg = "Last name is not valid!"
            this._logger.error({}, msg);
            throw msg;
        }

        if (options?.password && options.password.length < 8) {
            const msg = "Password is not valid!"
            this._logger.error({}, msg);
            throw msg;
        }


        if (options.password) {
            const {salt, hash} = await createHashFromString(options.password);
            delete options.password;
            const encrypted = {
                password_hash: hash,
                salt: salt
            }

            options = Object.assign(options, encrypted);
        }

        await this._userUpdaterRepositoryProvider.update(id, options)
        .catch(e => {
            this._logger.error(e, e.message ?? "Could not update user");
            throw e;
          });
    }

}

export { UserUpdater }