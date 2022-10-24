interface IUserCreator {
    create(email: string, first_name: string, last_name: string, password: string): Promise<void>;
}

export { IUserCreator }