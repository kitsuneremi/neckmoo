/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { staticOptimization: true }
}

module.exports = nextConfig

// const path = require('path');

// module.exports = {
//   reactStrictMode: true,
//   experimental: { staticOptimization: true },
//   webpack: (config, { isServer }) => {
//     // Thêm rule cho file scss
//     config.module.rules.push({
//       test: /\.module\.scss$/,
//       use: [
//         isServer ? 'css-loader' : 'style-loader',
//         {
//           loader: 'css-loader',
//           options: {
//             modules: true,
//             sourceMap: true,
//             importLoaders: 1,
//             localIdentName: '[local]___[hash:base64:5]',
//           },
//         },
//         {
//           loader: 'sass-loader',
//           options: {
//             sourceMap: true,
//           },
//         },
//       ],
//       include: path.resolve(__dirname, './styles'), // Thay đổi đường dẫn đến thư mục chứa file scss của bạn
//     });

//     return config;
//   },
// };
