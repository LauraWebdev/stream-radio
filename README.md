# Stream Radio
A WIP 24/7 livestream radio toolset

## Inspiration
Main inspiration for this project comes from torch2424's [live-stream-radio](https://github.com/torch2424/live-stream-radio), a project I have been contributing for in 2018. Since then, devices got more powerful and toolsets evolved. This project aims to fill the same spot live-stream-radio left, written from the ground up with more streamlined and extended customization options.

## Getting Started
1. Clone this repo
2. Run `npm install`
3. Create a `config.json` file based on the example below within `radio/` and fill it out
4. Place a valid mp4 video file under `radio/video/video.mp4`
5. Place your mp3 music files under `radio/audio/`
6. Run `node .`

## Features
- [x] Endless streaming
- [x] Video loop
- [x] Random music shuffle
- [x] Dynamic text overlays
- [x] Basic CLI status output
- [ ] Image overlays
- [ ] Repetition guardrails
- JSON API
  - [X] Auth
  - [X] Current Song Info
  - [ ] Stream Info
  - [ ] Skip Song Action
  - [ ] Stop Radio Action

## Config Documentation
| Key                                  | Type                   | Variables                                                               | Description                                                                             |
|--------------------------------------|------------------------|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| stream.url                           | `string`               | {{key}} => stream.key                                                   | The URL to your rtmp stream.                                                            |
| stream.key                           | `string`               |                                                                         | A stream key for your stream.                                                           |
| stream.width                         | `number`               |                                                                         | Output width in pixels, eg: 1280                                                        |
| stream.height                        | `number`               |                                                                         | Output height in pixels, eg: 720                                                        |
| stream.fps                           | `number`               |                                                                         | Output fps, eg: 30                                                                      |
| stream.videobitrate                  | `string`               |                                                                         | Output video bitrate, eg: 6000k                                                         |
| stream.audiobitrate                  | `string`               |                                                                         | Output audio bitrate, eg: 128k                                                          |
| stream.audiosamplerate               | `number`               |                                                                         | Output audio samplerate, eg: 44100                                                      |
| paths.audio                          | `string`               |                                                                         | Path relative to index.js for your mp3 files                                            |
| paths.video                          | `string`               |                                                                         | Path relative to index.js for your mp4 file                                             |
| overlay.texts[]                      | `array`                |                                                                         | An array of text overlays                                                               |
| overlay.texts[].x                    | `number`               |                                                                         | Horizontal position from left, padding is not included                                  |
| overlay.texts[].y                    | `number`               |                                                                         | Vertical position from top, padding is not included                                     |
| overlay.texts[].format               | `string`               | {{title}} => Current song title,<br/> {{artist}} => current song artist | Text template                                                                           |
| overlay.texts[].font.size            | `number`               |                                                                         | Text size, eg: 24                                                                       |
| overlay.texts[].font.color           | `string`               |                                                                         | Text color, eg: white                                                                   |
| overlay.texts[].font.opacity         | `number`               |                                                                         | Text opacity in the range of 0.0 to 1.0, eg: 0.6                                        |
| overlay.texts[].background.color     | `string`               |                                                                         | (Optional) Background color, eg: white                                                  |
| overlay.texts[].background.opacity   | `number`               |                                                                         | (Optional) Background opacity in the range of 0.0 to 1.0, eg: 0.6                       |
| overlay.texts[].background.padding[] | `array[number,number]` |                                                                         | (Optional) Background padding, first number is y, second is x                           |
| intermission.enabled                 | `boolean`              |                                                                         | (Unused) Whether intermissions are enabled                                              |
| intermission.path                    | `string`               |                                                                         | (Unused) Path relative to index.js to the mp4 video file used for intermissions         |
| intermission.frequency               | `number`               |                                                                         | (Unused) The amount of songs needed to play the intermission, eg: 5                     |
| api.enabled                          | `boolean`              |                                                                         | Whether the API is enabled                                                              |
| api.port                             | `number`               |                                                                         | (Optional) The port used by the API. Defaults to 3000 if not set                        |
| api.key                              | `string`               |                                                                         | (Optional) The key required for API requests, if not set, no authentication is required |

## Intermissions
> [!NOTE]
> Intermissions are currently in development

## API
> [!NOTE]
> The API is currently in development

The JSON api is available on the port set in your `config.json` or `3000`.

### GET `/` - System Status
Generally returns `{ "status": 200 }` if the API is available.

### GET `/current` - Current Song Info
Returns information about the current song

#### Example return
```json
{
    "playing": false
}
```
```json
{
    "playing": true,
    "title": "Poison Jam (Part II)",
    "artist": "2 Mello",
    "duration": 228.466939,
    "current": 144.32682923226474
}
```

## Example Config
```json
{
  "stream": {
    "url": "rtmp://a.rtmp.youtube.com/live2/{{key}}",
    "key": "YOUR-STREAM-KEY-HERE",
    "width": 1280,
    "height": 720,
    "fps": 30,
    "videobitrate": "6000k",
    "audiobitrate": "128k",
    "audiosamplerate": 44100
  },
  "paths": {
    "audio": "./radio/audio",
    "video": "./radio/video"
  },
  "overlay": {
    "texts": [
      {
        "x": 65,
        "y": 65,
        "format": "Stream Radio Test",
        "font": {
          "size": 16,
          "color": "white",
          "opacity": 1.0
        },
        "background": {
          "color": "black",
          "opacity": 1.0,
          "padding": [15, 15]
        }
      },
      {
        "x": 65,
        "y": 570,
        "format": "{{title}}",
        "font": {
          "size": 24,
          "color": "white",
          "opacity": 1.0
        },
        "background": {
          "color": "black",
          "opacity": 1.0,
          "padding": [15, 15]
        }
      },
      {
        "x": 65,
        "y": 615,
        "format": "{{artist}}",
        "font": {
          "size": 18,
          "color": "white",
          "opacity": 0.8
        },
        "background": {
          "color": "black",
          "opacity": 1.0,
          "padding": [15, 15]
        }
      }
    ]
  },
  "intermission": {
    "enabled": false,
    "path": "./radio/intermission.mp4",
    "frequency": 5
  },
  "api": {
    "enabled": false,
    "port": 3000,
    "key": "API-KEY-HERE"
  }
}
```

## License
This project was licensed under the GNU General Public license version 3.

[More information](LICENSE)