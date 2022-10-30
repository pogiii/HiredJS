import { PositionCreator } from "../../src/services/PositionCreator"
import { PositionCreatorRepositoryProvider } from "../../src/providers/database/prisma/PositionCreatorRepositoryProvider"
import { PositionGetter } from "../../src/services/PositionGetter"
import { PositionGetterRepositoryProvider } from "../../src/providers/database/prisma/PositionGetterRepositoryProvider"
import { PositionDeleter } from "../../src/services/PositionDeleter"
import { PositionDeleterRepositoryProvider } from "../../src/providers/database/prisma/PositionDeleterRepositoryProvider"
import pino from "pino"


describe("Position Deleter Test Suite", () => {

    const logger = pino({
        level: "silent"
    })

    let positionName = "A Test Position";
    let positionId: number | undefined;


    const positionDeleterRepositoryProvider = new PositionDeleterRepositoryProvider() 
    const positionDeleter = new PositionDeleter(logger, positionDeleterRepositoryProvider); 

    const positionGetterRepositoryProvider = new PositionGetterRepositoryProvider() 
    const positionGetter = new PositionGetter(logger, positionGetterRepositoryProvider);

    beforeAll(async () => {
        const positionCreatorRepositoryProvider = new PositionCreatorRepositoryProvider();
        const positionCreator = new PositionCreator(logger, positionCreatorRepositoryProvider);

        await positionCreator.create(positionName, "This a test position description, if you read this outside the code then this test didn't work.");

        const positions = await positionGetter.getAll();

        for (let i = 0; i < positions.length; i++) {

            if (positions[i]?.name === positionName) {
                positionId = positions[i]?.id;
                break;
            }

        }

        if (!positionId) {
            fail("It should not get here.");
        }
    });

    it("Shold delete a position", async () => {

        if (!positionId) {
            fail("It should not get here.");
        }

        await positionDeleter.delete(positionId)
    });

    it("Should not find the position", async () => {
        
        if (!positionId) {
            fail("It should not get here.");
        }

        const position = await positionGetter.get(positionId);

        expect(position).toBeNull();
    })
})