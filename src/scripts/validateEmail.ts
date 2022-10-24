function validateEmail(mail: string): boolean {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail)
}

export { validateEmail }