import { BaseRepositoryProvider } from "./BaseRepositoryProvider";
import { IPositionDeleterRepositoryProvider } from "../../../contracts/interfaces/IPositionDeleterRepositoryProvider"

class PositionDeleterRepositoryProvider extends BaseRepositoryProvider implements IPositionDeleterRepositoryProvider {
    
    async delete(id: number): Promise<void> {
        this._prisma.position.delete({
            where: {
                id: id
            }
        })
    }

}

export { PositionDeleterRepositoryProvider }