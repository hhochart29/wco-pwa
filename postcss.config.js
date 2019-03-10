const join = require('path').join
const tailwindJS = join(__dirname, 'tailwind.js')

module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 0
    }),
    require('tailwindcss')(tailwindJS),
    require('autoprefixer')
  ]
}
