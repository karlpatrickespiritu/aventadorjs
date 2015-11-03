'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del');

var app = {
    src: [
        './node_modules/args-checker-js/dist/args-checker.js',
        './src/aventador.js'
    ]
}

gulp.task('clean', function() {
    del([
        './dist/*.js'
    ]).then(function(paths) {
        // console.log(paths)
    })
})

gulp.task('scripts', function(done) {

    // not minified
    gulp.src(app.src)
        .pipe(plumber())
        .pipe(concat('aventador.js'))
        .pipe(gulp.dest('./dist'))

    // minified
    gulp.src(app.src)
        .pipe(plumber())
        .pipe(concat('aventador.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))

    done()
})

gulp.task('watch', function () {
    gulp.watch(app.src, function () {
        gulp.start('default')
    })
})

gulp.task('default', ['clean', 'scripts', 'watch'])