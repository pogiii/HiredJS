import { Logger } from "pino";
import { Position } from "../contracts/entities/Position";
import { IPositionGetter } from "../contracts/interfaces/IPositionGetter";
import { IPositionGetterRepositoryProvider } from "../contracts/interfaces/IPositionGetterRepositoryProvide";

class PositionGetter implements IPositionGetter {

    private readonly _logger: Logger;
    private readonly _positionGetterRepositoryProvider: IPositionGetterRepositoryProvider

    constructor(logger: Logger, positionGetterRepositoryProvider: IPositionGetterRepositoryProvider) {
        this._logger = logger;
        this._positionGetterRepositoryProvider = positionGetterRepositoryProvider;
    }

    async get(id: number): Promise<Position | null> {
        return await this._positionGetterRepositoryProvider.get(id)
            .catch(e => {
                this._logger.error(e.message ?? e, "Could not get position");
                return null;
            })
    }
    async getAll(): Promise<(Position | null)[]> {
        return await this._positionGetterRepositoryProvider.getAll()
            .catch(e => {
                this._logger.error(e.message ?? e, "Could not get canddiates");
                return [null];
            })
    }

}

export { PositionGetter }