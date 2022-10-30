interface IPositionDeleter {
    delete(id: number): Promise<void>
}

export { IPositionDeleter }