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

          .rounded-t-2xl {
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
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
      boxOverlayBackground,
      borderColor,
      titleColor,
      titleAlign,
      titleSize,
      titleMargin,
      tagBackgroud,
      detailsMargin,
      authorBackgroud,
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
      window.background = "${background || ""}";

      // Box Styles
      window.boxBackground = "${boxBackground || ""}";
      window.boxOverlayBackground = "${boxOverlayBackground || ""}";
      window.borderColor = "${borderColor || ""}";

      // Title Styles
      window.titleColor = "${titleColor || ""}";
      window.titleAlign = "${titleAlign || ""}";
      window.titleSize = "${titleSize || ""}";
      window.titleMargin = "${titleMargin || ""}";

      // Details Styles
      window.tagBackgroud = "${tagBackgroud || ""}";
      window.detailsMargin = "${detailsMargin || ""}";
      window.authorBackgroud = "${authorBackgroud || ""}";

      // Tags Styles
      window.tagsColor = "${tagsColor || ""}";
      window.tagsSize = "${tagsSize || ""}";

      // Author Styles
      window.logoUrl = "${logoUrl || ""}";
      window.logoSize = "${logoSize || ""}";
      window.logoMargin = "${logoMargin || ""}";
      window.atSymbol = ${atSymbol || false};
      window.authorColor = "${authorColor || ""}";
      window.authorSize = "${authorSize || ""}";
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
