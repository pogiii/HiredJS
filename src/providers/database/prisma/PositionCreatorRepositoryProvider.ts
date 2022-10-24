import { IPositionCreatorRepositoryProvider } from "../../../contracts/interfaces/IPositionCreatorRepositoryProvider";
import { BaseRepositoryProvider } from "./BaseRepositoryProvider";

class PositionCreatorRepositoryProvider extends BaseRepositoryProvider implements IPositionCreatorRepositoryProvider {
    async create(name: string, description: string): Promise<void> {
        this._prisma.position.create({
            data: {
                name: name,
                description: description,
                status: 0
            }
        })
    }
}

export { PositionCreatorRepositoryProvider };