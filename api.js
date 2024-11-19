const express = require('express');
const {currentMetadata, getCurrentMetadata} = require("./stream");
const {getConfig} = require("./configUtils");

let api = null;
const port = process.env.PORT || 3000;

function authMiddleware(req, res, next) {
    const queryKey = req.query.key;
    const headerKey = req.get('Authorization');
    const apiKey = getConfig('api.key');

    if(!apiKey || queryKey === apiKey || headerKey === apiKey) {
        next();
    } else {
        res.status(401).json({error: { status: 401, message: "Unauthorized" }});
    }
}

function startApi() {
    api = express();
    api.use(authMiddleware);

    api.get('/', (req, res) => {
        res.json({ status: 200 });
    });

    api.get('/current', (req, res) => {
        let currentMetadata = getCurrentMetadata();
        res.json({
            playing: !!currentMetadata,
            ...currentMetadata,
        });
    });

    api.listen(port, () => {
        console.log(`[API] Started on port ${port}`);
    })
}

module.exports = {
    startApi
};