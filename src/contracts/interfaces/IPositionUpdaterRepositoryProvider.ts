import { PositionStatuses } from "../PositionStatuses";

interface IPositionUpdaterRepositoryProvider {
    update(id: number, options: {  status?: PositionStatuses, name?: string, description?: string }): Promise<void>
}

export { IPositionUpdaterRepositoryProvider }