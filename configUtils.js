const config = require('./radio/config.json');

function getConfig(path, variables = {}) {
    const segments = path.split('.');

    let value = config;
    for(let segment of segments) {
        if(value[segment] !== undefined) {
            value = value[segment];
        } else {
            return null;
        }
    }

    if (typeof value === 'string') {
        for(let key in variables) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            value = value.replace(regex, variables[key]);
        }
    }

    return value;
}

function getTexts(variables = {}) {
    const texts = config.overlay.texts;

    return texts.map(text => {
        let newText = { ...text };
        if (typeof newText.format === 'string') {
            for (let key in variables) {
                const regex = new RegExp(`{{${key}}}`, 'g');
                newText.format = newText.format.replace(regex, variables[key]);
            }
        }
        return newText;
    });
}

module.exports = {
    getConfig,
    getTexts
}