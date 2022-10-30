interface IUserDeleter {
    delete(id: number): Promise<void>
}

export {IUserDeleter}