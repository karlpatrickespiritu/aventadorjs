var gulp = require('gulp'),
    plumber = require('gulp-plumber');

gulp.task('js', function () {
    gulp.src(['bower_components/aventadorjs/dist/aventador.min.js'])
        .pipe(plumber())
        .pipe(gulp.dest('js'));
});

gulp.task('default', ['js']);