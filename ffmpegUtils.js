function sanitizeForFfmpeg(text) {
    return text
        .replaceAll(/\)/g, '\\)')
        .replaceAll(/\(/g, '\\(')
        .replaceAll(/\./g, '\\.')
        .replaceAll(/:/g, '\\:')
        .replaceAll(/'/g, "\\'")
        .replaceAll(/"/g, '\\"');
}

module.exports = {
    sanitizeForFfmpeg
}