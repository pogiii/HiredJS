import { BaseRepositoryProvider } from "./BaseRepositoryProvider";
import { IPositionUpdaterRepositoryProvider } from "../../../contracts/interfaces/IPositionUpdaterRepositoryProvider"
import { PositionStatuses } from "../../../contracts/PositionStatuses";
class PositionUpdaterRepositoryProvider extends BaseRepositoryProvider implements IPositionUpdaterRepositoryProvider {
    async update(id: number, options: { status?: PositionStatuses | undefined; name?: string | undefined; description?: string | undefined; }): Promise<void> {
        this._prisma.position.update({
            where: {id: id},
            data: options
        })
    }
}

export { PositionUpdaterRepositoryProvider }
