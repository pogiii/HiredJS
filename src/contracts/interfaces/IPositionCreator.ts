interface IPositionCreator {
    create(name: string, description: string): Promise<void>;
}

export { IPositionCreator }