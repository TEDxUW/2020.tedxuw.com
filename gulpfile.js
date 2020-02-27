const { series } = require('gulp');
const { src, dest, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');

function pugTask() {
    return src(['*.pug'])
        .pipe(pug())
        .pipe(dest("."));
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
        server: "."
    });

    pugTask();
    sassTask();
    watch(['*.pug'], series(pugTask));
    watch(['src/css/*.scss'], series(sassTask));
    watch("src/css/*.css").on('change', browserSync.reload);
    watch("*.html").on('change', browserSync.reload);
}

exports.default = serveTask;