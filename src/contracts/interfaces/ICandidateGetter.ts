import { Candidate } from "../entities/Candidate";

interface ICandidateGetter {
    get(id: number): Promise<Candidate | null>;
    getAll(): Promise<Array<Candidate | null>>;
    getByEmail(email: string): Promise<Candidate | null>;
}

export { ICandidateGetter }