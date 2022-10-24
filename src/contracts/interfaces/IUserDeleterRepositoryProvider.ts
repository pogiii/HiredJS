interface IUserDeleterRepositoryProvider {
    delete(id: number): Promise<void>;
}

export { IUserDeleterRepositoryProvider }