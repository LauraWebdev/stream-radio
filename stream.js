const ffmpeg = require("fluent-ffmpeg");
const {getRandomAudioFile, getAudioMetadata} = require("./audioUtils");
const {getConfig} = require("./configUtils");
const path = require("path");
const {sanitizeForFfmpeg} = require("./ffmpegUtils");
const {getTextOverlayFilters} = require("./textOverlay");

const audioFolder = path.resolve(__dirname, `./${getConfig('paths.audio')}`);
const videoFile = `./${getConfig('paths.video')}/video.mp4`;
const rtmpUrl = getConfig('stream.url', {
    key: getConfig('stream.key')
});

async function startStream() {
    const audioFile = getRandomAudioFile(audioFolder);
    console.log('AudioFile: ' + audioFile);

    let audioMetadata;
    try {
        audioMetadata = await getAudioMetadata(audioFile);
        console.log('Duration: ' + audioMetadata.duration);
        console.log('Title: ' + audioMetadata.title);
        console.log('Artist: ' + audioMetadata.artist);
    } catch(err) {
        console.error('Error fetching audio metadata ' + err.message);
        startStream();
    }

    let textOverlay = getTextOverlayFilters({
        title: audioMetadata.title,
        artist: audioMetadata.artist,
    });

    // Start Encoding
    ffmpeg()
        .input(videoFile)
        .inputOptions('-stream_loop -1')	// Loop
        .inputOptions('-re')				// Realtime, use FPS from output filter
        .input(audioFile)
        .outputOptions([
            // Input Mapping
            '-map 0:v:0',
            '-map 1:a:0',

            `-filter:v fps=${getConfig('stream.fps')}`,
            `-t ${audioMetadata.duration}`,	// Use audio duration, either cuts off or loops video

            // Encoding
            '-c:v libx264',
            '-preset veryfast',

            // Bitrate
            `-maxrate ${getConfig('stream.videobitrate')}`,
            `-bufsize ${getConfig('stream.videobitrate')}`,

            // Filters
            '-vf', `scale=${getConfig('stream.width')}:${getConfig('stream.height')},${textOverlay}`,

            // Output
            `-g ${4 * getConfig('stream.fps')}`,
            `-keyint_min ${4 * getConfig('stream.fps')}`,
            '-pix_fmt yuv420p',
            '-c:a aac',
            `-b:a ${getConfig('stream.audiobitrate')}`,
            `-ar ${getConfig('stream.audiosamplerate')}`,
            '-f flv',
        ])
        .output(rtmpUrl)
        .on('start', (cmd) => {
            console.log('-------------------');
            console.log('ffmpeg start: ' + cmd);
        })
        .on('error', (err) => {
            console.error('ffmpeg error: ' + err.message);
        })
        .on('progress', (progress) => {
            console.log(`ffmpeg progress: Time: ${progress.timemark} | FPS: ${progress.currentFps} | Frame: ${progress.frames} | Speed: ${progress.currentKbps || '0'}`);
        })
        .on('end', () => {
            console.log('ffmpeg end');
            startStream();
        })
        .run();
}

module.exports = {
    startStream,
}