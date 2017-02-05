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
        gulpRename = require('gulp-rename'),
        plumber = require('gulp-plumber'),
		fs = require('fs');

// --   Styling        
const   sass = require('gulp-sass'),
        sourceMaps = require('gulp-sourcemaps'),
        autoPrefixer = require('gulp-autoprefixer'),
		sassLint = require('gulp-sass-lint');

// --   Javascript
const   babelify = require('babelify'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        glob = require('glob'),
        es = require('event-stream');

// -- Browser sync
const   bs = require('browser-sync').create(); // bs instance


// =======================================================================
//      AVAILABLE TASKS
// =======================================================================

gulp.task('browser-sync', ['styles'], () => {
    bs.init({
        server: {
            baseDir: "./"
        },
    });  
});

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
        .pipe(bs.reload({stream: true}));
});


gulp.task('styles-lint', () => {
    var file = fs.createWriteStream('./linting-reports/styles-linting-report.xml');
    var stream = gulp.src(set.src + '/' + set.styles + '/**/*.scss')
		.pipe(sassLint())
        .pipe(sassLint.format(file))
        .pipe(sassLint.failOnError());
		stream.on('finish', function() {
			file.end();
		});
    return stream;
});


// !!!! todo: still have to clean using const vars instead of hardcoded
gulp.task('es6Modules', () => {

    glob('src/js/bundle-**.js', function(err, files) {
        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry] })
                .transform('babelify', {
                    presets: ['es2015']
                })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(gulpRename({
                    dirname: 'js',
                }))
                .pipe(gulp.dest('dist'));
        });

        return es.merge.apply(null, tasks);
    }) 

});

// =======================================================================
//      DEFINE WATCHERS WHEN THINGS CHANGE
// =======================================================================

gulp.task('default', ['styles', 'es6Modules'], () => {
    gulp.watch(set.src + '/' + set.styles + '/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['es6Modules']);
});

gulp.task('watch', ['browser-sync'], () => {
    gulp.watch(set.src + '/' + set.styles + '/**/*.scss', ['styles']);
    gulp.watch("*.html").on('change', bs.reload);
});
