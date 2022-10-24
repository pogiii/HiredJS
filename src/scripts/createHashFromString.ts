import crypto from "crypto";
import argon2 from "argon2";
async function createHashFromString(str: string) {
    const result = {
        salt: "",
        hash: ""
    }

    const salt = crypto.randomBytes(16);
    result.hash = await argon2.hash(str, {salt: salt});
    result.salt = salt.toString("base64");

    return result;
}

export { createHashFromString }