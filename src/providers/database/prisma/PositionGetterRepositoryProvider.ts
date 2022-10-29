import { Position } from "../../../contracts/entities/Position";
import { IPositionGetterRepositoryProvider } from "../../../contracts/interfaces/IPositionGetterRepositoryProvide";
import { BaseRepositoryProvider } from "./BaseRepositoryProvider";

class PositioGetterRepositoryProvider extends BaseRepositoryProvider implements IPositionGetterRepositoryProvider {
    async get(id: number): Promise<Position | null> {
        return await this._prisma.position.findUnique({
            where: { id: id }
        })
    }
    async getAll(): Promise<Position[]> {
        return await this._prisma.position.findMany();
    }

}

export { PositioGetterRepositoryProvider }