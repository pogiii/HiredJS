function hashToBuffer(salt: string): Buffer {
    return Buffer.from(salt, 'base64');
}

export { hashToBuffer };
