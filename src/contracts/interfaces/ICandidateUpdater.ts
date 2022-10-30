import { CandidateStatuses } from "../CandidateStatuses";

interface ICandidateUpdater {
    update(id: number, options: {email?: string, first_name?: string, last_name?: string, cv_url?: string, status?: CandidateStatuses}): Promise<void>
}

export { ICandidateUpdater }