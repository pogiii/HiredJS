import { Logger } from "pino";
import { Candidate } from "../contracts/entities/Candidate";
import { ICandidateGetter } from "../contracts/interfaces/ICandidateGetter";
import { ICandidateGetterRepositoryProvider } from "../contracts/interfaces/ICandidateGetterRepositoryProvider";

class CandidateGetter implements ICandidateGetter {

    private readonly _logger: Logger
    private readonly _candidateGetterRepositoryProvider: ICandidateGetterRepositoryProvider

    constructor(logger: Logger, candidateGetterRepositoryProvider: ICandidateGetterRepositoryProvider) {
        this._candidateGetterRepositoryProvider = candidateGetterRepositoryProvider;
        this._logger = logger;
    }

    async get(id: number): Promise<Candidate | null> {
        return await this._candidateGetterRepositoryProvider.get(id)
            .catch(e => {
                this._logger.error(e.message ?? e, "Could not get canddiate");
                return null;
            })
    }
    async getAll(): Promise<(Candidate | null)[]> {
        return await this._candidateGetterRepositoryProvider.getAll()
            .catch(e => {
                this._logger.error(e.message ?? e, "Could not get canddiate");
                return [null];
            })
    }

}

export { CandidateGetter }