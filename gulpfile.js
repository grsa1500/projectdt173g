//Läser in gulp och gulp-paket
const {src, dest, watch, series, parallel} = require('gulp');
const concat = require('gulp-concat');
const uglify = require("gulp-uglify-es").default;
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create()
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
 
sass.compiler = require('node-sass');


/* Sökvägar */
const files = {
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    cssPath: "src/**/*.css",
    imgPath: "src/img/*",
    sassPath:"src/sass/*.scss"
}

//Lägga över HTML-filer från src till pub
function copyHTML() {
    return src(files.htmlPath)
    .pipe(dest('pub'))
    .pipe(browserSync.stream())
    
}

function sassTask() {
    return src(files.sassPath)
    
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS())  
      .pipe(dest('pub/css'))
      .pipe(browserSync.stream());
  };
   


// Sammanslå js-filer, minifiera-filer
function jsTask() {
    return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(dest('pub/js'))
    .pipe(browserSync.stream())
}

function imgTask() {
    return src(files.imgPath)
    .pipe(dest('pub/img'))
    .pipe(browserSync.stream())
}


// Lyssnar på ändringar och när filer sparas
function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'pub/'
        }
    });

     watch([files.htmlPath, files.jsPath, files.imgPath, files.sassPath],
        parallel(copyHTML, jsTask, imgTask, sassTask))

        .on('change', browserSync.reload);
  
}


exports.default = series(

    parallel(copyHTML, jsTask, imgTask, sassTask),
    watchTask 
   
);

