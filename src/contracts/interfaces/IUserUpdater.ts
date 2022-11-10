interface IUserUpdater {
    update(id: number, options: { email?: string, first_name?: string, last_name?: string, password?: string, refresh_token?: string }): Promise<void>;
}

export { IUserUpdater }