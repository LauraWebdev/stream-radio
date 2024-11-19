const {startStream} = require("./stream");
const {getConfig} = require("./configUtils");
const {startApi} = require("./api");
console.log("StreamRadio - Version 0.1.0");
console.log('Starting Stream...');

startStream();

if(getConfig('api.enabled')) {
    startApi();
}