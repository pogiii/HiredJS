interface IUserAuthenticator {
    authenticate(email: string, password: string): Promise<{ refresh_token?: string; access_token?: string; }>;
    refreshAccessToken(token: string): Promise<string>;
}

export { IUserAuthenticator }