import { IPositionCreator } from "../contracts/interfaces/IPositionCreator";
import { IPositionCreatorRepositoryProvider } from "../contracts/interfaces/IPositionCreatorRepositoryProvider";
import { Logger } from 'pino';
class PositionCreator implements IPositionCreator {

    private readonly _positionCreatorRepositoryProvider: IPositionCreatorRepositoryProvider;
    private readonly _logger: Logger;

    constructor(logger: Logger, positionCreatorRepositoryProvider: IPositionCreatorRepositoryProvider) {
        this._positionCreatorRepositoryProvider = positionCreatorRepositoryProvider;
        this._logger = logger;
    }
    async create(name: string, description: string): Promise<void> {
        if (name.length < 1) {
            const msg = "Name is not valid!";
            this._logger.error({}, msg)
            throw msg;
        }
        
        if (description.length < 1) {
            const msg = "Name is not valid!";
            this._logger.error({}, msg)
            throw msg;
        }

        await this._positionCreatorRepositoryProvider.create(name, description);
    }

}

export { PositionCreator };