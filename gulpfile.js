var browserify = require('gulp-browserify'),
    gulp = require('gulp'),
    minifier = require('gulp-minifier'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require('gulp-rename');


gulp.task('dist/angular-nadobit-api.js', function() {
    return gulp.src('src/angular-nadobit-api.js')
        .pipe(browserify({debug: true}))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist'));
});


gulp.task('dist/angular-nadobit-api.min.js', gulp.series(
    'dist/angular-nadobit-api.js',
    function() {
        return gulp.src('dist/angular-nadobit-api.js')
            .pipe(minifier({
                minify: true,
                minifyJS: true,
                collapseWhitespace: true,
            }))
            .pipe(rename('angular-nadobit-api.min.js'))
            .pipe(gulp.dest('dist'));
    }
));


gulp.task('build', gulp.parallel(
    'dist/angular-nadobit-api.min.js'
));
