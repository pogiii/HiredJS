interface IPositionDeleterRepositoryProvider {
    delete(id: number): Promise<void>;
}

export { IPositionDeleterRepositoryProvider }