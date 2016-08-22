// -- Settings

var set = {
    src: 'src',
    dist: 'dist',
    styles: 'styles',
};

// -- requirements

var gulp = require('gulp'),
    plumber =       require('gulp-plumber'),
    autoPrefixer =  require('gulp-autoprefixer'),
    sass =          require('gulp-sass'),
    sourceMaps =    require('gulp-sourcemaps');

gulp.task('styles', function () {
    gulp.src(set.src + '/' + set.styles + '/**/*.scss')
    .pipe(plumber({
        errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }
    }))
    .pipe(sourceMaps.init())
    .pipe(sass())
    // last 2 versions fails with autoprefixer on windows10
    .pipe(autoPrefixer())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(set.dist + '/' + set.styles))
});

gulp.task('default', function () {
    gulp.watch(set.src + '/' + set.styles + '/**/*.scss', ['styles']);
});
