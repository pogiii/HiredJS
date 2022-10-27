import { Candidate } from "../../../contracts/entities/Candidate";
import { ICandidateGetterRepositoryProvider } from "../../../contracts/interfaces/ICandidateGetterRepositoryProvider";
import { BaseRepositoryProvider } from "./BaseRepositoryProvider";

class CandidateGetterRepositoryProvider extends BaseRepositoryProvider implements ICandidateGetterRepositoryProvider {

    async get(id: number): Promise<Candidate | null> {
        return await this._prisma.candidate.findUnique({
            where: { id: id },
        })
    }

    async getAll(): Promise<Array<Candidate | null>> {
        return await this._prisma.candidate.findMany();
    }

}

export { CandidateGetterRepositoryProvider }