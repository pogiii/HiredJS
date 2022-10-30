import { PositionCreator } from "../../src/services/PositionCreator"
import { PositionCreatorRepositoryProvider } from "../../src/providers/database/prisma/PositionCreatorRepositoryProvider"
import { PositionGetter } from "../../src/services/PositionGetter"
import { PositionGetterRepositoryProvider } from "../../src/providers/database/prisma/PositionGetterRepositoryProvider"
import { PositionDeleter } from "../../src/services/PositionDeleter"
import { PositionDeleterRepositoryProvider } from "../../src/providers/database/prisma/PositionDeleterRepositoryProvider"
import { PositionUpdater } from "../../src/services/PositionUpdater"
import { PositionUpdaterRepositoryProvider } from "../../src/providers/database/prisma/PositionUpdaterRepositoryProvider"
import pino from "pino"
import { Position } from "../../src/contracts/entities/Position"

describe("Position Updater Test Suite", () => {

    const logger = pino({
        level: "silent"
    })

    const positionUpdaterRepositoryProvider = new PositionUpdaterRepositoryProvider()
    const positionUpdater = new PositionUpdater(logger, positionUpdaterRepositoryProvider);

    const positionGetterRepositoryProvider = new PositionGetterRepositoryProvider()
    const positionGetter = new PositionGetter(logger, positionGetterRepositoryProvider);

    let positionName = "A Test Position";
    let position: Position | null;

    beforeAll(async () => {

        const positionCreatorRepositoryProvider = new PositionCreatorRepositoryProvider();
        const positionCreator = new PositionCreator(logger, positionCreatorRepositoryProvider);

        await positionCreator.create(positionName, "This a test position description, if you read this outside the code then this test didn't work.");

        const positions = await positionGetter.getAll()

        if (positions[0] === null) {
            fail("It should not reach here.");
        }


        for(let pos of positions) {

            if (pos?.name === positionName) {
                position = pos;
                break;
            }

        } 

    });

    it("should throw because options are empty", async () => {
        let success = true;
        let message = ""

        if(!position?.id) {
            fail("It shouldn't reach here.");
        }

        await positionUpdater.update(position?.id, {})
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("Options cannot be empty!")
    });

    it("should throw because name is invalid", async () => {
        let success = true;
        let message = ""

        if(!position?.id) {
            fail("It shouldn't reach here.");
        }

        await positionUpdater.update(position?.id, {name: ""})
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("Position name is not valid!")
    });

    it("should throw because description is invalid", async () => {
        let success = true;
        let message = ""

        if(!position?.id) {
            fail("It shouldn't reach here.");
        }

        await positionUpdater.update(position?.id, {description: ""})
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("Position description is not valid!")
    });

    it("should change position status", async () => {
        let success = true;
        let message = ""

        if(!position?.id) {
            fail("It shouldn't reach here.");
        }

        await positionUpdater.update(position?.id, {status: 1})
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeTruthy();
        expect(message).toEqual("")

        const fetchedPosition = await positionGetter.get(position.id);

        expect(fetchedPosition?.status).not.toEqual(position.status);
    })

    afterAll(async () => {

        const positionDeleterRepositoryProvider = new PositionDeleterRepositoryProvider();
        const positionDeleter = new PositionDeleter(logger, positionDeleterRepositoryProvider);

        if (position === null) {
            fail("It should not reach here.");
        }

        await positionDeleter.delete(position.id);

        if (await positionGetter.get(position.id) !== null) {
            fail("It should not reach here.")
        }
     })

});