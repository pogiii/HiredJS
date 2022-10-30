import { UserCreator } from "../../src/services/UserCreator"
import { UserCreatorRepositoryProvider } from "../../src/providers/database/prisma/UserCreatorRepositoryProvider"
import { UserGetter } from "../../src/services/UserGetter"
import { UserGetterRepositoryProvider } from "../../src/providers/database/prisma/UserGetterRepositoryProvider"
import { UserDeleter } from "../../src/services/UserDeleter"
import { UserDeleterRepositoryProvider } from "../../src/providers/database/prisma/UserDeleterRepositoryProvider"
import pino from "pino"

describe("User Deleter Test Suite", () => {

    const logger = pino({
        level: "silent"
    })
    const UserEmail = "user@email.com";
    let UserId: number | undefined;


    const userDeleterRepositoryProvider = new UserDeleterRepositoryProvider() 
    const userDeleter = new UserDeleter(logger, userDeleterRepositoryProvider); 

    const userGetterRepositoryProvider = new UserGetterRepositoryProvider() 
    const userGetter = new UserGetter(logger, userGetterRepositoryProvider);

    beforeAll(async () => {

            const userCreatorRepositoryProvider = new UserCreatorRepositoryProvider()
            const userCreator = new UserCreator(logger, userCreatorRepositoryProvider);

            await userCreator.create(UserEmail , "Tamir", "Ashach", "Pass@word1");

            const User = await userGetter.getByEmail(UserEmail);

            if (!User?.id) {
                fail("It should not get here.");
            }

            UserId = User?.id;
    })

    it("Should delete the User", async () => {

        if(!UserId) {
            fail("It should not get here.");
        }

        await userDeleter.delete(UserId);
    })

    it("Should not find the User", async () => {
        
        if(!UserId) {
            fail("It should not get here.");
        }

        const user = await userGetter.get(UserId);

        expect(user).toBeNull();

    })

})