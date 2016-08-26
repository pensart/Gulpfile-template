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
const   babelify = require('babelify'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        es = require('event-stream');


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

    // include all files that need to be bundled
    var files = [
        'src/js/main-app.js',
        'src/js/main-another.js'
    ]

    var tasks = files.map(function(entry) {
        return browserify({ entries: [entry] })
            .transform('babelify', {
                presets: ['es2015']
            })
            .bundle()
            .pipe(source(entry))
            .pipe(buffer())
            .pipe(gulp.dest('build'));
    });

    return es.merge.apply(null, tasks);

    // browserify('src/js/main-app.js')
    //     .transform('babelify', {
    //         presets: ['es2015']
    //     })
    //     .bundle()
    //     .pipe(source('src/js/main-app.js'))
    //     .pipe(buffer())
    //     .pipe(gulp.dest('build'));
});

// =======================================================================
//      DEFINE WATCHERS WHEN THIINGS CHANGE
// =======================================================================

gulp.task('default', ['styles', 'es6'], () => {
    gulp.watch(set.src + '/' + set.styles + '/**/*.scss', ['styles']);
    gulp.watch('src/js/apps/app.js', ['es6']);
});
