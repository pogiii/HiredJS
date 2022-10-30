import { ICandidateDeleter } from "../contracts/interfaces/ICandidateDeleter";
import { Logger } from "pino";
import { ICandidateDeleterRepositoryProvider } from "../contracts/interfaces/ICandidateDeleterRepositoryProvider";
class CandidateDeleter implements ICandidateDeleter {

    private readonly _logger: Logger
    private readonly _candidateDeleterRepositoryProvider: ICandidateDeleterRepositoryProvider

    constructor(logger: Logger, candidateDeleterRepositoryProvider: ICandidateDeleterRepositoryProvider) {
        this._logger = logger;
        this._candidateDeleterRepositoryProvider = candidateDeleterRepositoryProvider;
    }

    async delete(id: number): Promise<void> {
        this._candidateDeleterRepositoryProvider.delete(id)
        .catch(e => {
            this._logger.error(e.message ?? e, "Could not delete candidate");
        })
    }

}

export { CandidateDeleter }