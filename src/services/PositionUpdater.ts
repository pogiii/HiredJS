import { Logger } from "pino";
import { IPositionUpdater } from "../contracts/interfaces/IPositionUpdater";
import { PositionStatuses } from "../contracts/PositionStatuses";
import { IPositionUpdaterRepositoryProvider } from "../contracts/interfaces/IPositionUpdaterRepositoryProvider"

class PositionUpdater implements IPositionUpdater {

    private readonly _logger: Logger;
    private readonly _positionUpdaterRepositoryProvider: IPositionUpdaterRepositoryProvider

    constructor(logger: Logger, positionUpdaterRepositoryProvider: IPositionUpdaterRepositoryProvider) {
        this._logger = logger;
        this._positionUpdaterRepositoryProvider = positionUpdaterRepositoryProvider;
    }

    async update(id: number, options: { status?: PositionStatuses | undefined; name?: string | undefined; description?: string | undefined; }): Promise<void> {
        
        if (Object.keys(options).length === 0) {
            const msg = "Options cannot be empty!";
            this._logger.error({}, msg);
            throw msg;
        }

        if (options.name?.length == 0) {
            const msg = "Position name is not valid!";
            this._logger.error({}, msg);
            throw msg;
        }

        if (options.description?.length == 0) {
            const msg = "Position description is not valid!";
            this._logger.error({}, msg);
            throw msg;
        }

        this._positionUpdaterRepositoryProvider.update(id, options)
        .catch(e => {
            this._logger.error(e, e.message ?? "Could not update position");
            throw e;
          })
    }

}

export {PositionUpdater};