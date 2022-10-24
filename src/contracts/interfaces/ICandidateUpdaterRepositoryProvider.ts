import { CandidateStatuses } from "../CandidateStatuses";

interface ICandidateUpdaterRepositoryProvider {
    update(id: number, options: {email?: string, first_name?: string, last_name?: string, cv_url?: string, status?: CandidateStatuses}): Promise<void>
}

export { ICandidateUpdaterRepositoryProvider }