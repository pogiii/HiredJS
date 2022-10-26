import { PositionCreator } from '../../src/services/PositionCreator'
import { PositionCreatorRepositoryProvider } from '../../src/providers/database/prisma/PositionCreatorRepositoryProvider'
import pino from "pino"
describe("Position Creator Test Suite", () => {

    const logger = pino();
    const positionCreatorRepositoryProvider = new PositionCreatorRepositoryProvider();
    const positionCreator = new PositionCreator(logger, positionCreatorRepositoryProvider);

    it("should throw because description is invalid", async () => {

    });

    it("should throw because name is invalid", async () => {

    });

    it("Should create a record in the database", async () => {

    })
})