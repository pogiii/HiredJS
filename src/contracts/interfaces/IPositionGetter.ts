import { Position } from "../entities/Position";

interface IPositionGetter {
    get(id: number): Promise<Position | null>;
    getAll(): Promise<Array<Position | null>>;
}

export { IPositionGetter }