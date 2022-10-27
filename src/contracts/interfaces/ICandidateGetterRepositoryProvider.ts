import { Candidate } from "../entities/Candidate";

interface ICandidateGetterRepositoryProvider {
    get(id: number): Promise<Candidate | null>;
    getAll(): Promise<Array<Candidate | null>>
}

export { ICandidateGetterRepositoryProvider }