import { ICandidateCreatorRepositoryProvider } from "../../../contracts/interfaces/ICandidateCreatorRepositoryProvider";
import { BaseRepositoryProvider } from "./BaseRepositoryProvider";

class CandidateCreatorRepositoryProvider extends BaseRepositoryProvider implements ICandidateCreatorRepositoryProvider {
    async create(email: string, first_name: string, last_name: string, cv_url: string): Promise<void> {
        await this._prisma.candidate.create({
            data: {
                email: email,
                first_name: first_name,
                last_name: last_name,
                cv_url: cv_url,
                status: 0
            }
        });
    };
}

export { CandidateCreatorRepositoryProvider };