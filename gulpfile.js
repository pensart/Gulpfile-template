// -- Settings

var set = {
    src: 'src',
    dist: 'dist',
    styles: 'styles',
};

// -- requirements

var gulp = require('gulp'),
    plumber =       require('gulp-plumber'),
    sass =          require('gulp-sass'),
    sourceMaps =    require('gulp-sourcemaps')
    autoPrefixer =  require('gulp-autoprefixer');

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
    .pipe(autoPrefixer('last 2 versions'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(set.dist + '/' + set.styles))
});

gulp.task('default', function () {
    gulp.watch(set.src + '/' + set.styles + '/**/*.scss', ['styles']);
});
