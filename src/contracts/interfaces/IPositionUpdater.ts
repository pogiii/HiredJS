import { PositionStatuses } from "../PositionStatuses";

interface IPositionUpdater {
    update(id: number, options: {  status?: PositionStatuses, name?: string, description?: string }): Promise<void>
}

export { IPositionUpdater }