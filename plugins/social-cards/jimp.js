const path = require("path");
const jimp = require("jimp");

async function init() {
  const titleFont = await jimp.loadFont(`${__dirname}/fonts/OpenSans.fnt`);
  const img = await jimp.read(`${__dirname}/templates/wave.png`);
  
  img
    .print(
      titleFont,
      10,
      30,
      {
        text: "This is an automated GIF",
        alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
        alignmentY: jimp.VERTICAL_ALIGN_TOP,
      },
      280,
      150
    )
    .write("jimp.png")
}

init();