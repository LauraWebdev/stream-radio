const {sanitizeForFfmpeg} = require("./ffmpegUtils");
const {getTexts} = require("./configUtils");

function getTextOverlayFilters(variables = []) {
    let texts = getTexts(variables);

    return texts.map(text => {
        let output = "";

        output += `drawtext=text='${sanitizeForFfmpeg(text.format)}'`;
        output += `:fontcolor=${text.font.color}@${text.font.opacity}`;
        output += `:fontsize=${text.font.size}`;
        output += `:x=${text.x}`;
        output += `:y=${text.y}`;

        if(text.background) {
            output += `:box=1:boxcolor=${text.background.color}@${text.background.opacity}`;

            if(text.background.padding) {
                output += `:boxborderw=${text.background.padding[0]}|${text.background.padding[1]}`;
            }
        }

        return output;
    }).join(",");
}

module.exports = {
    getTextOverlayFilters,
}