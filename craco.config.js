const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        type: "asset",
      });
      webpackConfig.optimization.minimizer.push(
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              encodeOptions: {
                jpeg: {
                  // https://sharp.pixelplumbing.com/api-output#jpeg
                  quality: 100,
                },
                webp: {
                  // https://sharp.pixelplumbing.com/api-output#webp
                  lossless: true,
                },
                avif: {
                  // https://sharp.pixelplumbing.com/api-output#avif
                  lossless: true,
                },

                // png by default sets the quality to 100%, which is same as lossless
                // https://sharp.pixelplumbing.com/api-output#png
                png: {},

                // gif does not support lossless compression at all
                // https://sharp.pixelplumbing.com/api-output#gif
                gif: {},
              },
            },
          },
          generator: [
            {
              preset: "w",
              implementation: ImageMinimizerPlugin.sharpGenerate,
              options: {
                encodeOptions: {
                  webp: {
                    quality: 90,
                  },
                },
              },
            },
          ],
        })
      );
      return webpackConfig;
    },
  },
};
