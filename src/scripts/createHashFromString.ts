import crypto from "crypto";
import * as argon2 from "@node-rs/argon2";
async function createHashFromString(str: string) {
    const result = {
        salt: "",
        hash: ""
    }

    const salt = crypto.randomBytes(16);
    result.hash = await argon2.hash(str, { secret: salt });
    result.salt = salt.toString("base64");

    return result;
}

export { createHashFromString }