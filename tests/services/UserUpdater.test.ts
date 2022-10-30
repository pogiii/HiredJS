import { UserCreator } from "../../src/services/UserCreator"
import { UserCreatorRepositoryProvider } from "../../src/providers/database/prisma/UserCreatorRepositoryProvider"
import { UserGetter } from "../../src/services/UserGetter"
import { UserGetterRepositoryProvider } from "../../src/providers/database/prisma/UserGetterRepositoryProvider"
import { UserDeleter } from "../../src/services/UserDeleter"
import { UserDeleterRepositoryProvider } from "../../src/providers/database/prisma/UserDeleterRepositoryProvider"
import { UserUpdater } from "../../src/services/UserUpdater"
import { UserUpdaterRepositoryProvider } from "../../src/providers/database/prisma/UserUpdaterRepositoryProvider"
import pino from "pino"
import { User } from "../../src/contracts/entities/User"

describe("User Updater Test Suite", () => {

    const logger = pino({
        level: "silent"
    })

    const userUpdaterRepositoryProvider = new UserUpdaterRepositoryProvider()
    const userUpdater = new UserUpdater(logger, userUpdaterRepositoryProvider);

    const userGetterRepositoryProvider = new UserGetterRepositoryProvider()
    const userGetter = new UserGetter(logger, userGetterRepositoryProvider);

    let userEmail = "User@email.com";
    let user: User | null;

    beforeAll(async () => {

        const userCreatorRepositoryProvider = new UserCreatorRepositoryProvider();
        const userCreator = new UserCreator(logger, userCreatorRepositoryProvider);

        await userCreator.create(userEmail, "Eviatar", "Barkoni", "Pass@word");

        user = await userGetter.getByEmail(userEmail)

        if (user === null) {
            fail("It should not reach here.");
        }

    });

    it("should throw because email is invalid", async () => {
        let success = true;
        let message = ""

        if(!user?.id){
            fail("It should not reach here.")
        }

        await userUpdater.update(user.id, {email: "aviv%%gmail.cccom"})
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

        if(!user?.id){
            fail("It should not reach here.")
        }

        await userUpdater.update(user.id, {first_name: ""})
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

        if(!user?.id){
            fail("It should not reach here.")
        }

        await userUpdater.update(user.id, {last_name: ""})
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

        if(!user?.id){
            fail("It should not reach here.")
        }

        await userUpdater.update(user.id, {password: "pass"})
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeFalsy();
        expect(message).toEqual("Password is not valid!")
    });

    it("should change password and hash", async () => {
        let success = true;
        let message = ""

        if(!user?.id){
            fail("It should not reach here.")
        }

        await userUpdater.update(user.id, {password: "ThisIsAnotherPassword"})
            .catch(e => {
                message = e;
                success = false;
            })

        expect(success).toBeTruthy();
        expect(message).toEqual("");

        const fetchedUser = await userGetter.get(user.id);

        expect(fetchedUser?.salt).not.toEqual(user.salt);
        expect(fetchedUser?.password_hash).not.toEqual(user.password_hash);

        console.log(fetchedUser);
        console.log(user);

    });

    afterAll(async () => {

        const userDeleterRepositoryProvider = new UserDeleterRepositoryProvider();
        const userDeleter = new UserDeleter(logger, userDeleterRepositoryProvider);

        if (user === null) {
            fail("It should not reach here.");
        }

        await userDeleter.delete(user.id);

        if (await userGetter.get(user.id) !== null) {
            fail("It should not reach here.")
        }
     })
})