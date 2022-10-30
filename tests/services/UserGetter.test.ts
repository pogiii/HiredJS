import pino from "pino";
import { User } from "../../src/contracts/entities/User";
import { UserGetterRepositoryProvider } from "../../src/providers/database/prisma/UserGetterRepositoryProvider";
import { UserGetter } from "../../src/services/UserGetter";

describe("User Getter Test Suite", () => {

    const logger = pino();
    const userGetterRepositoryProvider = new UserGetterRepositoryProvider()
    const userGetter = new UserGetter(logger, userGetterRepositoryProvider);

    let user: User | null;

    it("should get all users", async () => {
        const users = await userGetter.getAll();

        expect(users.length).toBeGreaterThan(0);
        expect(typeof users[0] === "object").toBeTruthy();

        user = users[0];
    })

    it("should find user by id", async () => {

        if(typeof user?.id !== "number") {
            fail("it should not get here.");
        }

        const foundUser = await userGetter.get(user.id);

        expect(foundUser).toEqual(user);

    });

    it("should find user by email", async () => {

        if(typeof user?.email !== "string") {
            fail("it should not get here.");
        }

        const foundUser = await userGetter.getByEmail(user.email);

        expect(foundUser).toEqual(user);

    });
})