-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "cv_url" TEXT NOT NULL,
    "status" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CandidateToPosition" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CandidateToPosition_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CandidateToPosition_B_fkey" FOREIGN KEY ("B") REFERENCES "Position" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateToPosition_AB_unique" ON "_CandidateToPosition"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateToPosition_B_index" ON "_CandidateToPosition"("B");
