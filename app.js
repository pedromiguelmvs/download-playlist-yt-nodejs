const fs = require('fs');
const path = require('path');
const youtubedl = require('youtube-dl');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.question('Write one link of yt: ', function(ytlink) {
//   const video = youtubedl(ytlink);

//   video.on('info', function(info) {
//     console.log('Donwload started');
//     console.log(`Title: ${info._filename}`);
//     console.log(`Size: ${info.size}`);
//   });

//   video.pipe(fs.createWriteStream("video.mp4"));
// })

function playlist(url) {

  'use strict'
  const video = youtubedl(url);

  video.on('error', function error(err) {
    console.log('error 2:', err);
  })

  let size = 0;
  video.on('info', function(info) {
    size = info.size;
    let output = path.join(__dirname + '/', size + '.mp4');
    video.pipe(fs.createWriteStream(output));
  })

  let pos = 0;
  video.on('data', function data(chunk) {
    pos += chunk.length;
    if (size) {
      let percent = (pos / size * 100).toFixed(2);
      process.stdout.cursorTo(0);
      process.stdout.clearLine(1);
      process.stdout.write(percent + '%');
    }
  })

  video.on('next', playlist);

}

rl.question('Write one link of a playlist of yt: ', function(ytlink) {
  const video = playlist(ytlink);

  // video.on('info', function(info) {
  //   console.log('Donwload started');
  //   console.log(`Title: ${info._filename}`);
  //   console.log(`Size: ${info.size}`);
  // });
})

rl.on("close", function() {
  console.log("\nBYE BYE >///<  !!!");
  process.exit(0);
});