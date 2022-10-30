interface ICandidateDeleter {
    delete(id: number): Promise<void>
}

export { ICandidateDeleter }