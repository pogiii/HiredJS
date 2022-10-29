import { Position } from "../entities/Position";

interface IPositionGetterRepositoryProvider {
    get(id: number): Promise<Position | null>;
    getAll(): Promise<Position[]>
}

export { IPositionGetterRepositoryProvider }