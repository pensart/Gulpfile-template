// -- Settings

var set = {
    src: 'src',
    dist: 'dist',
    styles: 'styles',
};

// -- requirements


const   gulp = require('gulp'),
        plumber =       require('gulp-plumber'),
        autoPrefixer =  require('gulp-autoprefixer'),
        sass =          require('gulp-sass'),
        sourceMaps =    require('gulp-sourcemaps');

const   babel = require('gulp-babel');

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
    .pipe(autoPrefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(set.dist + '/' + set.styles))
});

gulp.task('es6', () => {
    return gulp.src('src/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['styles', 'es6'], () => {
    gulp.watch(set.src + '/' + set.styles + '/**/*.scss', ['styles']);
});
