interface ICandidateCreatorRepositoryProvider {
    create(email: string, first_name: string, last_name: string, cv_url: string): Promise<void>;
}

export { ICandidateCreatorRepositoryProvider }