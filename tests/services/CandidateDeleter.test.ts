import { CandidateCreator } from "../../src/services/CandidateCreator"
import { CandidateCreatorRepositoryProvider } from "../../src/providers/database/prisma/CandidateCreatorRepositoryProvider"
import { CandidateGetter } from "../../src/services/CandidateGetter"
import { CandidateGetterRepositoryProvider } from "../../src/providers/database/prisma/CandidateGetterRepositoryProvider"
import { CandidateDeleter } from "../../src/services/CandidateDeleter"
import { CandidateDeleterRepositoryProvider } from "../../src/providers/database/prisma/CandidateDeleterRepositoryProvider"
import pino from "pino"

describe("Candidate Deleter Test Suite", () => {

    const logger = pino({
        level: "silent"
    })
    const candidateEmail = "candidate@email.com";
    let candidateId: number | undefined;


    const candidateDeleterRepositoryProvider = new CandidateDeleterRepositoryProvider() 
    const candidateDeleter = new CandidateDeleter(logger, candidateDeleterRepositoryProvider); 

    const candidateGetterRepositoryProvider = new CandidateGetterRepositoryProvider() 
    const candidateGetter = new CandidateGetter(logger, candidateGetterRepositoryProvider);

    beforeAll(async () => {

            const candidateCreatorRepositoryProvider = new CandidateCreatorRepositoryProvider()
            const candidateCreator = new CandidateCreator(logger, candidateCreatorRepositoryProvider);

            await candidateCreator.create(candidateEmail , "Tamir", "Ashach", "http://this-cv-does-not-exist.com/");

            const candidate = await candidateGetter.getByEmail(candidateEmail);

            if (!candidate?.id) {
                fail("It should not get here.");
            }

            candidateId = candidate?.id;
    })

    it("Should delete the candidate", async () => {

        if(!candidateId) {
            fail("It should not get here.");
        }

        await candidateDeleter.delete(candidateId);
    })

    it("Should not find the candidate", async () => {
        
        if(!candidateId) {
            fail("It should not get here.");
        }

        const candidate = await candidateGetter.get(candidateId);

        expect(candidate).toBeNull();

    })

})