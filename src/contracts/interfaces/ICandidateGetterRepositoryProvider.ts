import { Candidate } from "../entities/Candidate";

interface ICandidateGetterRepositoryProvider {
    get(id: number): Promise<Candidate>;
}

export { ICandidateGetterRepositoryProvider }