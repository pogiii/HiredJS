import express from "express"
import { Logger } from "pino";
import cors from "cors";
import helmet from "helmet";
import { Controllers } from "./Controllers";
import { IUserAuthenticator } from "../contracts/interfaces/IAuthenticateUser";

function startExpressServer(port: number, logger: Logger, userAuthenticator: IUserAuthenticator) {

    // Initialize express.
    const app = express();

    // Initialize controllers.
    const controllers = (new Controllers(logger, userAuthenticator)).getControllers()

    // Add middlewares.
    app.use(cors());
    app.use(helmet());
    app.use(controllers);

    // Start express
    app.listen(port, () => {
        logger.info(`Server is listening on port: ${port} 🔥`)
    })

}

export { startExpressServer }