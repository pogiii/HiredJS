interface IUserCreatorRepositoryProvider {
    create(email: string, first_name: string, last_name: string, password_hash: string, salt: string): Promise<void>;
}

export { IUserCreatorRepositoryProvider }