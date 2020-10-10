'use strict';

const
  gulp = require('gulp'),
  fs = require('fs'),
  path = require('path'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2');

function fonts() {
  gulp.src('./src/assets/fonts/*.ttf')
    .pipe(ttf2woff())
    .pipe(gulp.dest('./src/assets/fonts'));
  return gulp.src('./src/assets/fonts/*.ttf')
    .pipe(ttf2woff2())
    .pipe(gulp.dest('./src/assets/fonts'));
}

function fontFamily(done) {
  let fileContent = fs.readFileSync('./src/styles/fonts.scss');
  if (fileContent == '') {
    fs.writeFile('./src/styles/fonts.scss', '', cb);
    return fs.readdir('./src/assets/fonts', function (err, items) {
      if (items) {
        let cFontName;
        for (var i = 0; i < items.length; i++) {
          let fontName = items[i].split('.');
          fontName = fontName[0];
          if (cFontName != fontName) {
            fs.appendFile('./src/styles/fonts.scss', '@include font("' + fontName + '", "' + fontName + '", "400", "normal");\r\n', cb);
          }
          cFontName = fontName;
        }
      }
      done();
    })
  }
}
function cb() { }

const build = gulp.series(fonts, fontFamily);

exports.default = build;

