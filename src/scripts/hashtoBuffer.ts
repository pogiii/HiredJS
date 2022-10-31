function hashToBuffer(hash: string, salt: string): Buffer {
    return Buffer.from(salt, 'base64');
}

export { hashToBuffer };
