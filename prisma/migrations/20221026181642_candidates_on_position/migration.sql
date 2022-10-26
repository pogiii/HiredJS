/*
  Warnings:

  - You are about to drop the `_CandidateToPosition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CandidateToPosition";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CandidatesOnPositions" (
    "positionId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,

    PRIMARY KEY ("positionId", "candidateId"),
    CONSTRAINT "CandidatesOnPositions_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CandidatesOnPositions_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
