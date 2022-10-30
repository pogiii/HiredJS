import { IPositionDeleter } from "../contracts/interfaces/IPositionDeleter";
import { Logger } from "pino";
import { IPositionDeleterRepositoryProvider } from "../contracts/interfaces/IPositionDeleterRepositoryProvider";
class PositionDeleter implements IPositionDeleter {

    private readonly _logger: Logger
    private readonly _positionDeleterRepositoryProvider: IPositionDeleterRepositoryProvider

    constructor(logger: Logger, positionDeleterRepositoryProvider: IPositionDeleterRepositoryProvider) {
        this._logger = logger;
        this._positionDeleterRepositoryProvider = positionDeleterRepositoryProvider;
    }

    async delete(id: number): Promise<void> {
        this._positionDeleterRepositoryProvider.delete(id)
        .catch(e => {
            this._logger.error(e.message ?? e, "Could not delete position");
        })
    }

}

export { PositionDeleter }