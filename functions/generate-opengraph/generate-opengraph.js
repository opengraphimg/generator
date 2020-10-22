// Dependencies
const path = require("path");
const fs = require("fs");
const chromium = require("chrome-aws-lambda");

// Script
const filePath = path.join(__dirname, "image.js");
const script = fs.readFileSync(filePath, "utf-8");

exports.handler = async (event, context) => {
  await chromium.font(
    "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
  );

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  page.setViewport({
    width: 1200,
    height: 630,
  });

  await page.setContent(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
        <style>
          .rounded-2xl {
            border-radius: 16px;
          }
        </style>
      </head>
      <body>
        <div id="app">
          <div>Hi, this is the OG Image</div>
        </div>
      </body>
    </html>
  `);

  const {
    queryStringParameters: {
      style,
      tags: tagsParam,
      title,
      author,
      background,
      boxBackground,
      titleColor,
      titleAlign,
      titleSize,
      titleMargin,
      detailsMargin,
      tagsColor,
      tagsSize,
      logoUrl,
      logoSize,
      logoMargin,
      atSymbol,
      authorColor,
      authorSize,
    },
  } = event;
  const tags = tagsParam ? decodeURIComponent(tagsParam).split(",") : [];
  await page.addScriptTag({
    content: `
      window.style = "${style || "custom"}";
      window.title = "${title || "No Title"}";
      window.tags = ${JSON.stringify(tags)};
      window.author = "${author ? decodeURI(author) : ""}";
      window.background = "${background || "fff"}";

      // Box Styles
      window.boxBackground = "${boxBackground || "1a202c"}";

      // Title Styles
      window.titleColor = "${titleColor || "fff"}";
      window.titleAlign = "${titleAlign || "text-center"}";
      window.titleSize = "${titleSize || "text-6xl"}";
      window.titleMargin = "${titleMargin || "m-0"}";

      // Details Styles
      window.detailsMargin = "${detailsMargin || "-m-20"}";

      // Tags Styles
      window.tagsColor = "${tagsColor || "fff"}";
      window.tagsSize = "${tagsSize || "text-2xl"}";

      // Author Styles
      window.logoUrl = "${logoUrl || ""}";
      window.logoSize = "${logoSize || "w-10 h-10"}";
      window.logoMargin = "${logoMargin || "mr-4"}";
      window.atSymbol = ${atSymbol || false};
      window.authorColor = "${authorColor || "fff"}";
      window.authorSize = "${authorSize || "text-4xl"}";
    `,
  });
  await page.addScriptTag({ content: script });

  const boundingReact = await page.evaluate(() => {
    const app = document.getElementById("app");
    const { x, y, width, height } = app.children[0].getBoundingClientRect();

    return { x, y, width, height };
  });

  const screenshotBuffer = await page.screenshot({ clip: boundingReact });

  await browser.close();

  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Length": screenshotBuffer.length.toString(),
    },
    body: screenshotBuffer.toString("base64"),
  };
};
