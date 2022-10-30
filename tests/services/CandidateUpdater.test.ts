import { CandidateCreator } from "../../src/services/CandidateCreator"
import { CandidateCreatorRepositoryProvider } from "../../src/providers/database/prisma/CandidateCreatorRepositoryProvider"
import { CandidateGetter } from "../../src/services/CandidateGetter"
import { CandidateGetterRepositoryProvider } from "../../src/providers/database/prisma/CandidateGetterRepositoryProvider"
import { CandidateDeleter } from "../../src/services/CandidateDeleter"
import { CandidateDeleterRepositoryProvider } from "../../src/providers/database/prisma/CandidateDeleterRepositoryProvider"
import { CandidateUpdater } from "../../src/services/CandidateUpdater"
import { CandidateUpdaterRepositoryProvider } from "../../src/providers/database/prisma/CandidateUpdaterRepositoryProvider"
import pino from "pino"
import { Candidate } from "../../src/contracts/entities/Candidate"

describe("Candidate Updater Test Suite", () => {

    const logger = pino({
        level: "silent"
    })

    const candidateUpdaterRepositoryProvider = new CandidateUpdaterRepositoryProvider()
    const candidateUpdater = new CandidateUpdater(logger, candidateUpdaterRepositoryProvider);

    const candidateGetterRepositoryProvider = new CandidateGetterRepositoryProvider()
    const candidateGetter = new CandidateGetter(logger, candidateGetterRepositoryProvider);

    let candidateEmail = "candidate@email.com";
    let candidate: Candidate | null;

    beforeAll(async () => {

        const candidateCreatorRepositoryProvider = new CandidateCreatorRepositoryProvider();
        const candidateCreator = new CandidateCreator(logger, candidateCreatorRepositoryProvider);

        await candidateCreator.create(candidateEmail, "Eviatar", "Barkoni", "http://ihateueviatar.com/");

        candidate = await candidateGetter.getByEmail(candidateEmail)

        if (candidate === null) {
            fail("It should not reach here.");
        }

    });

    it("should throw because options are empty", async () => {
        let success = true;
        let message = ""

        if(!candidate?.id){
            fail("It should not reach here.")
        }

        await candidateUpdater.update(candidate?.id, {})
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("Options object cannot be empty!")
    });

    it("should throw because email is invalid", async () => {
        let success = true;
        let message = ""

        if(!candidate?.id){
            fail("It should not reach here.")
        }

        await candidateUpdater.update(candidate?.id, {email: "afj$$gmail.com"})
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

        if(!candidate?.id){
            fail("It should not reach here.")
        }

        await candidateUpdater.update(candidate?.id, {first_name: ""})
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

        if(!candidate?.id){
            fail("It should not reach here.")
        }

        await candidateUpdater.update(candidate?.id, {last_name: ""})
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

        if(!candidate?.id){
            fail("It should not reach here.")
        }

        await candidateUpdater.update(candidate?.id, {cv_url: "httpdsakwww.google.com"})
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("URL is not valid!")
    });

    it("should change status from 0 to 1", async () => {
       
        let success = true;
        let message = ""

        if(!candidate?.id){
            fail("It should not reach here.")
        }

        await candidateUpdater.update(candidate?.id, {status: 1})
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeTruthy();
        expect(message).toEqual("");

        const fetchedCandidate = await candidateGetter.get(candidate.id);

        expect(fetchedCandidate?.status).toBe(1);

    });

    afterAll(async () => {

        const candidateDeleterRepositoryProvider = new CandidateDeleterRepositoryProvider();
        const candidateDeleter = new CandidateDeleter(logger, candidateDeleterRepositoryProvider);

        if (candidate === null) {
            fail("It should not reach here.");
        }

        await candidateDeleter.delete(candidate.id);

        if (await candidateGetter.get(candidate.id) !== null) {
            fail("It should not reach here.")
        }
     })

});