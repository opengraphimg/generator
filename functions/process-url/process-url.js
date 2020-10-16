const qs = require("querystring");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// eslint-disable-next-line
exports.handler = async function (event, ctx) {
  const { queryStringParameters: query } = event;

  try {
    const imageUrl = cloudinary.url(
      `${process.env.IMAGE_VERSION}/og-images/image-1.png`,
      {
        // resouce_type: "raw"
        sign_url: true,
        secure: true,
        custom_pre_function: {
          function_type: "remote",
          source: `https://generator.opengraphimg.com/view?${qs.stringify(
            query
          )}`,
        },
      }
    );

    return {
      statusCode: 302,
      headers: {
        Location: imageUrl,
      },
      body: "",
    };
  } catch (e) {
    throw new Error(e);
  }
};
