import { Position } from "../entities/Position";

interface IPositionGetterRepositoryProvider {
    get(id: number): Promise<Position>;
}

export { IPositionGetterRepositoryProvider }