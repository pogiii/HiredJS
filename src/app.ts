// Imports
import dotenv from "dotenv"

dotenv.config({ path: "../.env" })

import { startExpressServer } from "./api/startExpressServer";
import pino from "pino"
import { UserAuthenticator } from "./services/UserAuthenticator";
import { UserGetter } from "./services/UserGetter";
import { UserUpdater } from "./services/UserUpdater";
import { UserUpdaterRepositoryProvider } from "./providers/database/prisma/UserUpdaterRepositoryProvider";
import { UserGetterRepositoryProvider } from "./providers/database/prisma/UserGetterRepositoryProvider";

// Logger
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
})

// Dependencies
const userUpdaterRepositoryProvider = new UserUpdaterRepositoryProvider();
const userUpdater = new UserUpdater(logger, userUpdaterRepositoryProvider);

const userGetterRepositoryProvider = new UserGetterRepositoryProvider();
const userGetter = new UserGetter(logger, userGetterRepositoryProvider);

const userAuthenticator = new UserAuthenticator(logger, userGetter, userUpdater);

// Etc.
logger.info({}, "Server starting up...")

// Loaders
startExpressServer(3000, logger, userAuthenticator);