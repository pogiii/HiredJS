function hashtoBuffer(hash, salt) {
    return Buffer.from(salt, 'base64');
}

export { hashtoBuffer };
