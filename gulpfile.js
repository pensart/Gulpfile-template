// =======================================================================
//      SOME SETTINGS TO WORK WITH 
// =======================================================================

// --   Environments
let     env = process.env.NODE_ENV;

// --   Locations
let   set = {
            src: 'src',
            distBase: 'build',
            distProduction: 'production',
            distDevelopment: 'development',
            scripts: 'js',
            styles: 'styles',
        };       

// --   General
const   gulp = require('gulp'),
        gulpif = require('gulp-if'),
        gulpRename = require('gulp-rename'),
        plumber = require('gulp-plumber'),
        fs = require('fs'),
        inquirer = require("inquirer");

// --   Pages
const   htmlbeautify = require('gulp-html-beautify'),
        htmlmin = require('gulp-htmlmin');

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
        es = require('event-stream'),
        uglify = require('gulp-uglify');

// --   Logging
const   log4js = require('log4js'),
        logger = log4js.getLogger();
        
logger.level = 'debug';

// --   Browser sync
const   bs = require('browser-sync').create(); // bs instance


// =======================================================================
//      AVAILABLE TASKS
// =======================================================================

gulp.task('browser-sync', ['styles'], () => {
    bs.init({
        server: {
            baseDir: set.dist
        },
    });  
});

gulp.task('pages', () => {
    var options = {
        "indent_size": 4,
        "indent_char": " ",
        "indent_with_tabs": false
    };
    gulp.src(set.src + '/' + '*.html')
        .pipe(gulpif( env === set.distProduction, htmlmin({ collapseWhitespace: true })))
        .pipe(gulpif( env !== set.distProduction, htmlbeautify(options)))
        .pipe(gulp.dest(set.dist))
        .pipe(bs.reload({stream: true}));
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
        .pipe(sass(gulpif( env === set.distProduction, {outputStyle: 'compressed'}, {outputStyle: 'nested'})).on('error', sass.logError))
        .pipe(autoPrefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulpif( env !== set.distProduction, sourceMaps.write()))
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


gulp.task('es6Modules', () => {

    glob(set.src + '/' + set.scripts +'/bundle-**.js', function(err, files) {
        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry], debug: env === set.distDevelopment })
                .transform('babelify', {
                    presets: ['es2015']
                })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(gulpRename({
                    dirname: set.scripts,
                }))
                .pipe(gulpif( env === set.distProduction, uglify()))
                .pipe(gulp.dest(set.dist));
        });

        return es.merge.apply(null, tasks)
        .pipe(bs.reload({stream: true}));
    }) 

});

// =======================================================================
//      DEFINE WATCHERS WHEN THINGS CHANGE
// =======================================================================

gulp.task('info', () => console.log('is this cool or what?'));

gulp.task('watch', (done) => {
    inquirer.prompt([
    {
        type: 'list',
        name: 'env',
        message: 'Select your environment...',
        choices: ['production', 'development'],
    }
    ]).then((answer) => {
        if(answer.env === 'production') {
            env = 'production';
            set.dist = set.distBase + '/' + set.distProduction;
            
        } else {
            env = process.env.NODE_ENV || 'development';
            set.dist = set.distBase + '/' + set.distDevelopment;
        }

        logger.info('Watching in ' + env.toUpperCase() + ' mode!');
        gulp.start('styles');
        gulp.start('pages');
        gulp.start('es6Modules');
        gulp.start('browser-sync');
        // watching list
        gulp.watch(set.src + '/' + set.styles + '/**/*.scss', ['styles']);
        gulp.watch(set.src + '/*.html', ['pages']);
        gulp.watch('src/js/**/*.js', ['es6Modules']);
        // callback
        done();
        // for testing -> console.log(JSON.stringify(answers, null, '  '));
    });
});

gulp.task('logger',() => {
    // logging examples    
    logger.level = 'Debug example output.';
    logger.trace("Trace example output.");
    logger.debug("Debug example output.");
    logger.info("Info example output.");
    logger.warn("Warn example output.");
    logger.error("Error example output.");
    logger.fatal("Fatal example output.");
});