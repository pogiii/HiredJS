import { PositionStatuses } from "../PositionStatuses";
import { Candidate } from "./Candidate";

type Position = {
  id: number
  status: PositionStatuses;
  name: string
  description: string
  applied_candidates?: unknown[] | number
};

export { Position }