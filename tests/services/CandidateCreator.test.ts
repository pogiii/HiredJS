import { CandidateCreator } from '../../src/services/CandidateCreator'
import { CandidateCreatorRepositoryProvider } from '../../src/providers/database/prisma/CandidateCreatorRepositoryProvider'
import pino from "pino"
describe("Candidate Creator Test Suite", () => {

    const logger = pino();
    const candidateCreatorRepositoryProvider = new CandidateCreatorRepositoryProvider();
    const candidateCreator = new CandidateCreator(logger, candidateCreatorRepositoryProvider);

    it("should throw because email is invalid", async () => {
        expect(await candidateCreator.create("avivgmail.com", "Aviv", "Ben-Yosef", "www.mycvhost.com")).rejects.toThrow()
    });

    it("should throw because first name is invalid", async () => {
        expect(
            await candidateCreator.create("aviv@gmail.com", "", "Ben-Yosef", "www.mycvhost.com")).rejects.toThrow()
    });

    it("should throw because last name is invalid", async () => {
        expect(await candidateCreator.create("aviv@gmail.com", "Aviv", "", "www.mycvhost.com")).rejects.toThrow()
    });

    it("should throw because CV URL is invalid", async () => {
        expect(await candidateCreator.create("aviv@gmail.com", "Aviv", "Ben-Yosef", "www#m#y#cvhost.com")).rejects.toThrow()
    });

    it("should create a record", async () => {
        expect(await candidateCreator.create("aviv@interactech.com", "Aviv", "Ben-Yosef", "https://stackoverflow.com/")).not.toThrow()
    })
})