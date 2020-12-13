const path = require("path")
const jimp = require("jimp")

module.exports = async ({ markdownNode }) => {
  const {
    frontmatter: { title = "Princiya Sequeira", tags = ["Article"], spoiler: description },
    fields: { slug },
    counter
  } = markdownNode

  const location = `./public${slug}card.jpg`;
  const cleanedTitle = title.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );
  // const time = counter ? `${Math.ceil(counter/60)}m` : "3m";
  const titleFont = await jimp.loadFont(`${__dirname}/fonts/Title.fnt`);
  const detailFont = await jimp.loadFont(`${__dirname}/fonts/Detail.fnt`);
  // const titleFont = await jimp.loadFont(jimp.FONT_SANS_64_BLACK);
  // const tagFont = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
  const tagFont = await jimp.loadFont(`${__dirname}/fonts/Tag.fnt`);
  
  return Promise.all([jimp.read(`${__dirname}/templates/wave.png`)]).then(
    ([image]) => {
      // image.print(detailFont, 77, 20, time, 1100).write(location)
      // image.print(detailFont, 77, 30, tags.join(','), 1100).write(location)
      image
        .print(
          titleFont,
          77,
          10,
          {
            text: cleanedTitle,
            alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
            alignmentY: jimp.VERTICAL_ALIGN_TOP,
          },
          700,
          300
        )
        .write(location)
      image
        .print(
          tagFont,
          77,
          20,
          {
            text: `Category: ${tags[0]}`,
            alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
            alignmentY: jimp.VERTICAL_ALIGN_BOTTOM,
          },
          700,
          300
        )
        .write(location)
      image
        .print(
          detailFont,
          300,
          20,
          {
            text: 'princiya.com',
            alignmentX: jimp.HORIZONTAL_ALIGN_RIGHT,
            alignmentY: jimp.VERTICAL_ALIGN_BOTTOM,
          },
          700,
          300
        )
        .write(location)
    }
  )
}