import pino from "pino"
import { Position } from "../../src/contracts/entities/Position"
import { PositionGetterRepositoryProvider } from "../../src/providers/database/prisma/PositionGetterRepositoryProvider"
import { PositionGetter } from "../../src/services/PositionGetter"

describe("Position Getter Test Suite", () => {

    const logger = pino()
    const positionGetterRepositoryProvider = new PositionGetterRepositoryProvider()
    const positionGetter = new PositionGetter(logger, positionGetterRepositoryProvider)

    let position: Position | null;

    it("should get all positions", async () => {

        const positions = await positionGetter.getAll();

        expect(positions.length).toBeGreaterThan(0);
        expect(positions[0]).not.toBeNull();

        position = positions[0];

    });

    it("should get one specific position", async () => {


        if (typeof position?.id !== "number") {
            fail('it should not reach here');
        }

        const found = await positionGetter.get(position.id);

        expect(found).toEqual(position);

    })

})