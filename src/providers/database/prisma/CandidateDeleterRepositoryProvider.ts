import { BaseRepositoryProvider } from "./BaseRepositoryProvider";
import { ICandidateDeleterRepositoryProvider } from "../../../contracts/interfaces/ICandidateDeleterRepositoryProvider"

class CandidateDeleterRepositoryProvider extends BaseRepositoryProvider implements ICandidateDeleterRepositoryProvider {
    
    async delete(id: number): Promise<void> {
        await this._prisma.candidate.delete({
            where: {
                id: id
            }
        })
    }

}

export { CandidateDeleterRepositoryProvider }