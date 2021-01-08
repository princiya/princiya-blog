const path = require("path");
const jimp = require("jimp");
const { BitmapImage, GifFrame, GifUtil } = require('gifwrap');

async function init() {
  try {
    const titleFont = await jimp.loadFont(`${__dirname}/fonts/OpenSans.fnt`);
    const rawImage = await GifUtil.read("./templates/banner1.gif");
    const copiedAsJimp = GifUtil.shareAsJimp(jimp, rawImage.frames[1]);
    const frames = [];
    
    copiedAsJimp
      .print(
        titleFont,
        10,
        10,
        {
          text: "Does life get boring",
          alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: jimp.VERTICAL_ALIGN_TOP,
        },
        280,
        150
      );

      frames.push(rawImage.frames[0]);
      frames.push(rawImage.frames[0]);
      frames.push(rawImage.frames[1]);
      frames.push(rawImage.frames[1]);
      frames.push(rawImage.frames[1]);
      frames.push(rawImage.frames[1]);
      frames.push(rawImage.frames[1]);

      GifUtil.quantizeDekker(frames);

      return GifUtil.write("card.gif", frames).then(outputGif => {
          console.log("modified");
      });
  } catch (e) {
    console.log('Error', e);
  }
}

init();




