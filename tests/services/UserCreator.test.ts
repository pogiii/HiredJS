import { UserCreator } from '../../src/services/UserCreator'
import { UserCreatorRepositoryProvider } from '../../src/providers/database/prisma/UserCreatorRepositoryProvider'
import pino from "pino"
describe("User Creator Test Suite", () => {

    const logger = pino();
    const userCreatorRepositoryProvider = new UserCreatorRepositoryProvider();
    const userCreator = new UserCreator(logger, userCreatorRepositoryProvider);

    it("should throw because email is invalid", async () => {
        expect(async () => {
            await userCreator.create("aviv%interactech.com", "Aviv", "Ben-Yosef","Pass@word1");
        }).toThrow();
    });

    it("should throw because first name is invalid", async () => {
        expect(async () => {
            await userCreator.create("aviv@interactech.com", "", "Ben-Yosef","Pass@word1");
        }).toThrow();
    });

    it("should throw because last name is invalid", async () => {
        expect(async () => {
            await userCreator.create("aviv@interactech.com", "Aviv", "","Pass@word1");
        }).toThrow();
    });

    it("should throw because password is invalid", async () => {
        expect(async () => {
            await userCreator.create("aviv@interactech.com", "Aviv", "Ben-Yosef","Pass@");
        }).toThrow();
    });

    it("should create a record in the database", async () => {
        expect(async () => {
            await userCreator.create("aviv@interactech.com", "Aviv", "Ben-Yosef","Pass@word1");
        }).not.toThrow();
    });
})