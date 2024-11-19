const {readdirSync} = require("node:fs");
const {join} = require("node:path");
const {ffprobe} = require("fluent-ffmpeg");


function getRandomAudioFile(audioFolder) {
    const files = readdirSync(audioFolder).filter(file => file.endsWith('.mp3'));
    if(files.length === 0) {
        throw new Error('There needs to be at least one .mp3 in audio folder');
    }
    return join(audioFolder, files[Math.floor(Math.random() * files.length)]);
}

function getAudioMetadata(audioFile) {
    return new Promise((resolve, reject) => {
        ffprobe(audioFile, (err, metadata) => {
            if(err) {
                reject(err);
            } else {
                const duration = metadata.format.duration;
                const title = metadata.format.tags?.title || "Unknown";
                const artist = metadata.format.tags?.artist || "Unknown";
                resolve({ title, artist, duration });
            }
        });
    });
}

module.exports = {
    getRandomAudioFile,
    getAudioMetadata,
}