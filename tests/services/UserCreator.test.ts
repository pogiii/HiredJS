import { UserCreator } from '../../src/services/UserCreator'
import { UserCreatorRepositoryProvider } from '../../src/providers/database/prisma/UserCreatorRepositoryProvider'
import pino from "pino"
describe("User Creator Test Suite", () => {

    const logger = pino();
    const userCreatorRepositoryProvider = new UserCreatorRepositoryProvider();
    const userCreator = new UserCreator(logger, userCreatorRepositoryProvider);

    it("should throw because email is invalid", async () => {
        let success = true;
        let message = ""

        await userCreator.create("aviv#%interactech.com", "Aviv", "Ben-Yosef", "Pass@word1")
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("Email is not valid!")
    });

    it("should throw because first name is invalid", async () => {
        let success = true;
        let message = ""

        await userCreator.create("aviv@interactech.com", "", "Ben-Yosef", "Pass@word1")
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("First name is not valid!")
    });

    it("should throw because last name is invalid", async () => {
        let success = true;
        let message = ""

        await userCreator.create("aviv@interactech.com", "Aviv", "", "Pass@word1")
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("Last name is not valid!")
    });

    it("should throw because password is invalid", async () => {
        let success = true;
        let message = ""

        await userCreator.create("aviv@interactech.com", "Aviv", "Ben-Yosef", "Pa")
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("Password is not valid!")
    });

    it.skip("should create a record in the database", async () => {
        let success = true;
        let message = ""

        await userCreator.create("aviv@interactech.com", "Aviv", "Ben-Yosef", "Pass@word1")
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeTruthy();
        expect(message).toEqual("")
    });
})