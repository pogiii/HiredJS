interface IUserAuthenticator {
    authenticate(email, password): Promise<{ refresh_token?: string; access_token?: string;}>
}

export {IUserAuthenticator}