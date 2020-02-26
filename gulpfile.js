const { series } = require('gulp');
const { src, dest, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');

function pugTask() {
    return src(['src/*.pug'])
        .pipe(pug())
        .pipe(dest("src"));
        // .pipe(browserSync.stream());
}

function sassTask() {
    return src(['src/css/*.scss'])
        .pipe(sass())
        .pipe(dest("src/css"));
        // .pipe(browserSync.stream());
}

function serveTask() {
    browserSync.init({
        server: "./src"
    });

    pugTask();
    sassTask();
    watch(['src/*.pug'], series(pugTask));
    watch(['src/css/*.scss'], series(sassTask));
    watch("src/css/*.css").on('change', browserSync.reload);
    watch("src/*.html").on('change', browserSync.reload);
}

exports.default = serveTask;