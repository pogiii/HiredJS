import { CandidateStatuses } from "../CandidateStatuses"
import { Position } from "./Position"

type Candidate = {
    id: number
    email: string
    first_name: string
    last_name: string
    cv_url: string
    status: CandidateStatuses
    applied_positions?: unknown[]
}

export { Candidate }