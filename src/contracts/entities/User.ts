import internal from "stream";

type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    password_hash: string;
    salt: string;
};

export { User }