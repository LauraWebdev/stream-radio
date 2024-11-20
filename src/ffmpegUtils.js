function sanitizeForFfmpeg(text) {
    const replacements = {
        "'": "\\'",
        '\\': '\\\\',
        ':': '\\:',
        '!': '\\!',
        '%': '\\%',
        '{': '\\{',
        '}': '\\}',
        '(': '\\(',
        ')': '\\)',
        ',': '\\,',
        '.': '\\.',
    };

    return text.replace(/['\\:!%{}(),.]/g, match => replacements[match]);
}

module.exports = {
    sanitizeForFfmpeg
}