// =======================================================================
//      SOME CONSTANTS TO WORK WITH 
// =======================================================================

// --   Locations
const   set = {
        src: 'src',
        dist: 'dist',
        scripts: 'js',
        styles: 'styles',
};

// --   General
const   gulp = require('gulp'),
        plumber = require('gulp-plumber');

// --   Styling        
const   sass = require('gulp-sass'),
        sourceMaps = require('gulp-sourcemaps'),
        autoPrefixer = require('gulp-autoprefixer');

// --   Javascript
const   babel = require('gulp-babel');


// =======================================================================
//      AVAILABLE TASKS
// =======================================================================

gulp.task('styles', () => {
    return gulp.src(set.src + '/' + set.styles + '/**/*.scss')
        .pipe(plumber({
            errorHandler: function(error) {
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
    return gulp.src(set.src + '/' + set.scripts + '/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(set.dist + '/' + set.scripts));
});

// =======================================================================
//      DEFINE WATCHERS WHEN THIINGS CHANGE
// =======================================================================

gulp.task('default', ['styles', 'es6'], () => {
    gulp.watch(set.src + '/' + set.styles + '/**/*.scss', ['styles']);
    gulp.watch(set.src + '/' + set.scripts + '/**/*.js', ['es6']);
});
