interface ICandidateDeleterRepositoryProvider {
    delete(id: number): Promise<void>;
}

export { ICandidateDeleterRepositoryProvider }