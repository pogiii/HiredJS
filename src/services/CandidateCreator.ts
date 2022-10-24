import { ICandidateCreator } from "../contracts/interfaces/ICandidateCreator";
import { ICandidateCreatorRepositoryProvider } from "../contracts/interfaces/ICandidateCreatorRepositoryProvider";
import { Logger } from 'pino';
import { validateEmail } from "../scripts/validateEmail";
import { validateURL } from "../scripts/validateURL";
class CandidateCreator implements ICandidateCreator {

    private readonly _candidateCreatorRepositoryProvider: ICandidateCreatorRepositoryProvider;
    private readonly _logger: Logger;

    constructor(logger: Logger, candidateCreatorRepositoryProvider: ICandidateCreatorRepositoryProvider) {
        this._candidateCreatorRepositoryProvider = candidateCreatorRepositoryProvider;
        this._logger = logger;
    }

    async create(email: string, first_name: string, last_name: string, cv_url: string): Promise<void> {
        if (email.length < 1 || !validateEmail(email)) {
            const msg = "Email is not valid!";
            this._logger.error({}, msg)
            throw msg;
        }

        if (first_name.length < 1) {
            const msg = "First name is not valid!";
            this._logger.error({}, msg)
            throw msg;
        }

        if (last_name.length < 1) {
            const msg = "Last name is not valid!";
            this._logger.error({}, msg)
            throw msg;
        }

        if(cv_url.length < 1 || !validateURL(cv_url)) {
            const msg = "URL is not valid!";
            this._logger.error({}, msg)
            throw msg;
        }

        await this._candidateCreatorRepositoryProvider.create(email, first_name, last_name, cv_url)
    }

}

export { CandidateCreator };