interface IPositionCreatorRepositoryProvider {
    create(name: string, description: string): Promise<void>;
}

export { IPositionCreatorRepositoryProvider }