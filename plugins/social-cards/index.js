// const path = require("path");
// const jimp = require("jimp");

// module.exports = async ({ markdownNode }) => {
//   const {
//     frontmatter: { title = "Princiya Sequeira", tags = ["Article"], spoiler: description },
//     fields: { slug },
//     counter
//   } = markdownNode

//   const location = `./public${slug}card.jpg`;
//   const cleanedTitle = title.replace(
//     /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
//     ""
//   );
//   const titleFont = await jimp.loadFont(`${__dirname}/fonts/OpenSans.fnt`);
  
//   return Promise.all([jimp.read(`${__dirname}/templates/wave.png`)]).then(
//     ([image]) => {
//       image
//         .print(
//           titleFont,
//           10,
//           10,
//           {
//             text: cleanedTitle,
//             alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
//             alignmentY: jimp.VERTICAL_ALIGN_TOP,
//           },
//           280,
//           150
//         )
//         .write(location)
//     }
//   )
// }
const { exec } = require('child_process');
const fs = require('fs');
const path = require("path");
const jimp = require("jimp");
const { BitmapImage, GifFrame, GifUtil } = require('gifwrap');

module.exports = async ({ markdownNode }) => {
    const {
      frontmatter: { title = "Princiya Sequeira", tags = ["Article"], spoiler: description },
      fields: { slug },
      counter
    } = markdownNode
    // const location = `public${slug}card.gif`;
    const cleanedTitle = title.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    );
    const titleFont = await jimp.loadFont(`${__dirname}/fonts/OpenSans.fnt`);
    const gif = await GifUtil.read(`${__dirname}/templates/banner1.gif`);
    const copiedAsJimp = GifUtil.shareAsJimp(jimp, gif.frames[0]);
    
    await copiedAsJimp
      .print(
        titleFont,
        10,
        10,
        {
          text: cleanedTitle,
          alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: jimp.VERTICAL_ALIGN_TOP,
        },
        280,
        150
      );

    const frames = [];
    frames.push(gif.frames[0]);
    frames.push(gif.frames[0]);
    frames.push(gif.frames[0]);
    frames.push(gif.frames[0]);
    frames.push(gif.frames[0]);
    frames.push(gif.frames[1]);
    frames.push(gif.frames[1]);

    GifUtil.quantizeDekker(frames);

    exec(`mkdir public${slug}`, (err, stdout, stderr) => {
      if (err) {
        console.log('err', err);
      }
    });
    
    return await GifUtil.write(`public${slug}card.gif`, frames);      
};