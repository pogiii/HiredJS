import pino from "pino";
import { CandidateGetterRepositoryProvider } from "../../src/providers/database/prisma/CandidateGetterRepositoryProvider"
import { CandidateGetter } from "../../src/services/CandidateGetter";

describe("Candidate Getter Test Suite", () => {
    const logger = pino()
    const candidateGetterRepositoryProvider = new CandidateGetterRepositoryProvider();
    const candidateGetter = new CandidateGetter(logger, candidateGetterRepositoryProvider);

    it("should return null", async () => {
        const result = await candidateGetter.get(2342);

        expect(result).toBe(null);
    })

    // This test could be pretty annoying when it's not an e2e as the IDs might not be available.
    it("should return a candidate", async () => {
        const result = await candidateGetter.get(3);

        expect(result).toHaveProperty("email");
    })


    it("should return an array of candidates", async () => {
        const result = await candidateGetter.getAll();

        expect(result.length).toBeGreaterThan(0);
        expect(typeof result[0]).toMatch("object");
    })
})