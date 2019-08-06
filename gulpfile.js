const gulp = require('gulp'),
watch = require('gulp-watch'),
postCSS = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssVars = require('postcss-simple-vars'),
nested = require('postcss-nested')
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create();


gulp.task('styles', () => {
    return gulp.src('./app/assets/styles/styles.css')
    .pipe(postCSS([cssImport, cssVars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('cssInject', ['styles'], () => {
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});


gulp.task('watch', () => {

    browserSync.init({
        server : {
            baseDir: "app"
        }
    });

    watch('./app/index.html', () => {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', () => {
        gulp.start('cssInject');
    });   
});


