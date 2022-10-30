import { PositionCreator } from '../../src/services/PositionCreator'
import { PositionCreatorRepositoryProvider } from '../../src/providers/database/prisma/PositionCreatorRepositoryProvider'
import pino from "pino"
describe("Position Creator Test Suite", () => {

    const logger = pino({
        level: "silent"
    })
    const positionCreatorRepositoryProvider = new PositionCreatorRepositoryProvider();
    const positionCreator = new PositionCreator(logger, positionCreatorRepositoryProvider);

    it("should throw because description is invalid", async () => {
        let success = true;
        let message = ""

        await positionCreator.create("Backend Developer (Senior)", "")
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("Description is not valid!")
    });

    it("should throw because name is invalid", async () => {
        let success = true;
        let message = ""

        await positionCreator.create("", "This is our description weehee!")
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("Name is not valid!")
    });

    // This test is being skipped as it will pollute the database.
    // Until I'll mock prisma, i don't really want it to run.
    it.skip("Should create a record in the database", async () => {
        let success = true;
        let message = ""

        await positionCreator.create("Backend Developer (Senior)", "This is our description weehee!")
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeTruthy();
        expect(message).toEqual("")
    })
})