import { CandidateCreator } from '../../src/services/CandidateCreator'
import { CandidateCreatorRepositoryProvider } from '../../src/providers/database/prisma/CandidateCreatorRepositoryProvider'
import pino from "pino"
describe("Candidate Creator Test Suite", () => {

    const logger = pino();
    const candidateCreatorRepositoryProvider = new CandidateCreatorRepositoryProvider();
    const candidateCreator = new CandidateCreator(logger, candidateCreatorRepositoryProvider);

    it("should throw because email is invalid", async () => {
        let success = true;
        let message = ""

        await candidateCreator.create("aviv&interactech.com", "Aviv", "Ben-Yosef", "http://www.mycv.com/")
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

        await candidateCreator.create("aviv@interactech.com", "", "Ben-Yosef", "http://www.mycv.com/")
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

        await candidateCreator.create("aviv@interactech.com", "Aviv", "", "http://www.mycv.com/")
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("Last name is not valid!")
    });

    it("should throw because CV URL is invalid", async () => {
        let success = true;
        let message = ""

        await candidateCreator.create("aviv@interactech.com", "Aviv", "Ben-Yosef", "httzp:/f/www.mycv.com/")
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("URL is not valid!")
    });

    // Please note that this test could fail as there is an unique email constraint on the schema.
    // As it is used to identify candidate and assign multiple positions to him.
    // Therefore it is skipped by default
    it.skip("should create a record", async () => {
        let success = true;
        let message = ""

        await candidateCreator.create("aviv@interactech.com", "Aviv", "Ben-Yosef", "http://www.mycv.com/")
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeTruthy();
        expect(message).toEqual("");
    })
})