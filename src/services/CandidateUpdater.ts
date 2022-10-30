import { CandidateStatuses } from "../contracts/CandidateStatuses";
import { ICandidateUpdater } from "../contracts/interfaces/ICandidateUpdater";
import { Logger } from "pino"
import { ICandidateUpdaterRepositoryProvider } from "../contracts/interfaces/ICandidateUpdaterRepositoryProvider";
import { validateEmail } from "../scripts/validateEmail";
import { validateURL } from "../scripts/validateURL";

class CandidateUpdater implements ICandidateUpdater {

    private readonly _logger: Logger
    private readonly _candidateUpdaterRepositoryProvider: ICandidateUpdaterRepositoryProvider

    constructor(logger: Logger, candidateUpdaterRepositoryProvider: ICandidateUpdaterRepositoryProvider) {
        this._logger = logger;
        this._candidateUpdaterRepositoryProvider = candidateUpdaterRepositoryProvider;
    }

    async update(id: number, options: { email?: string | undefined; first_name?: string | undefined; last_name?: string | undefined; cv_url?: string | undefined; status?: CandidateStatuses | undefined; }): Promise<void> {
        
        if (Object.keys(options).length == 0) {
            const msg = "Options object cannot be empty!";
            this._logger.error({}, msg);
            throw msg;
        }

        if (options?.first_name?.length == 0) {
            const msg = "First name is not valid!";
            this._logger.error({}, msg);
            throw msg;
        }

        if (options?.last_name?.length == 0) {
            const msg = "Last name is not valid!";
            this._logger.error({}, msg);
            throw msg;
        }

        if (options?.email && (!validateEmail(options.email) || options.email.length < 1)) {
            const msg = "Email is not valid!";
            this._logger.error({}, msg);
            throw msg;
        }

        if (options?.cv_url && (!validateURL(options.cv_url) || options.cv_url.length < 1)) {
            const msg = "URL is not valid!";
            this._logger.error({}, msg);
            throw msg;
        }

        await this._candidateUpdaterRepositoryProvider.update(id, options)
                  .catch(e => {
                    this._logger.error(e, e.message ?? "Could not update canddiate");
                    throw e;
                  })
    }

}

export { CandidateUpdater }