import { PositionStatuses } from "../PositionStatuses";
import { Candidate } from "./Candidate";

type Position = {
  id: number
  status: PositionStatuses;
  name: string
  description: string
  applicants: Candidate[] | number
};

export { Position }