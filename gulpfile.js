// =======================================================================
//      SOME CONSTANTS TO WORK WITH 
// =======================================================================

// --   Environments
let     gulpif = require('gulp-if'),
        env = process.env.NODE_ENV;

// --   Locations
let   set = {
            src: 'src',
            distProduction: 'build/production',
            distDevelopment: 'build/development',
            scripts: 'js',
            styles: 'styles',
        };       

// --   General
const   gulp = require('gulp'),
        gulpRename = require('gulp-rename'),
        plumber = require('gulp-plumber'),
		fs = require('fs');

// --   Pages
const   htmlbeautify = require('gulp-html-beautify');

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
            baseDir: "./build/dist"
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
        .pipe(htmlbeautify(options))
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
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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


gulp.task('es6Modules', () => {

    glob(set.src + '/' + set.scripts +'/bundle-**.js', function(err, files) {
        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry], debug: env === 'development' })
                .transform('babelify', {
                    presets: ['es2015']
                })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(gulpRename({
                    dirname: set.scripts,
                }))
                .pipe(gulpif( env === 'production', uglify()))
                .pipe(gulp.dest(set.dist));
        });

        return es.merge.apply(null, tasks);
    }) 

});

// =======================================================================
//      DEFINE WATCHERS WHEN THINGS CHANGE
// =======================================================================

gulp.task('watch', ['browser-sync'], () => {

    console.log('your envirement is set to: ' + env);
});

gulp.task('info', () => {
    console.log('your envirement is set to: ' + env);
});

var inquirer = require("inquirer");

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
            set.dist = set.distProduction;
            
        } else {
            env = process.env.NODE_ENV || 'development';
            set.dist = set.distDevelopment;
        }

        logger.info('Watching in ' + env.toUpperCase() + ' mode!');
        // watching list
        gulp.watch(set.src + '/' + set.styles + '/**/*.scss', ['styles']);
        gulp.watch(set.src + '/*.html', ['pages']);
        gulp.watch('src/js/**/*.js', ['es6Modules']);
        // callback
        done();
        // for testing -> console.log(JSON.stringify(answers, null, '  '));
    });

});


gulp.task('logger',()=>{
    // logging examples    
    logger.level = 'Debug example output.';
    logger.trace("Trace example output.");
    logger.debug("Debug example output.");
    logger.info("Info example output.");
    logger.warn("Warn example output.");
    logger.error("Error example output.");
    logger.fatal("Fatal example output.");
});