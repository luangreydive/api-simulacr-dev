let videoStitch = require('video-stitch');
const fs = require('fs');

let videoConcat = videoStitch.concat;

const unirVideos = async (videos) => {

videoConcat({
    // ffmpeg_path: <path-to-ffmpeg> Optional. Otherwise it will just use ffmpeg on your $PATH
    silent: true, // optional. if set to false, gives detailed output on console
    overwrite: false // optional. by default, if file already exists, ffmpeg will ask for overwriting in console and that pause the process. if set to true, it will force overwriting. if set to false it will prevent overwriting.
})
    .clips(videos)
    .output("prueba.mp4") //optional absolute file name for output file
    .concat()
    .then((outputFileName) => {
        fs.writeFile('prueba.mp4', outputFileName, function (err) {
            if (err) throw err;
            console.log('Saved!');

        });
    })

}

module.exports = unirVideos
