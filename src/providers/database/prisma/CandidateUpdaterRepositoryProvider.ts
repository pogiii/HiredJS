import { BaseRepositoryProvider } from "./BaseRepositoryProvider";
import { ICandidateUpdaterRepositoryProvider } from "../../../contracts/interfaces/ICandidateUpdaterRepositoryProvider"
import { CandidateStatuses } from "../../../contracts/CandidateStatuses";
class CandidateUpdaterRepositoryProvider extends BaseRepositoryProvider implements ICandidateUpdaterRepositoryProvider {
    async update(id: number, options: { email?: string | undefined; first_name?: string | undefined; last_name?: string | undefined; cv_url?: string | undefined; status?: CandidateStatuses | undefined; }): Promise<void> {
        await this._prisma.candidate.update({
            where: {id: id},
            data: options
        })
    }
}

export { CandidateUpdaterRepositoryProvider }