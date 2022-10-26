import { UserCreator } from '../../src/services/UserCreator'
import { UserCreatorRepositoryProvider } from '../../src/providers/database/prisma/UserCreatorRepositoryProvider'
import pino from "pino"
describe("User Creator Test Suite", () => {

    const logger = pino();
    const userCreatorRepositoryProvider = new UserCreatorRepositoryProvider();
    const userCreator = new UserCreator(logger, userCreatorRepositoryProvider);

    it("should throw because email is invalid", async () => {

    });

    it("should throw because first name is invalid", async () => {

    });

    it("should throw because last name is invalid", async () => {

    });

    it("should throw because password is invalid", async () => {

    });

    it("should create a record in the database", async () => {

    });
})