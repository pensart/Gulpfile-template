/**
* CONTENTS
*
* @ author: Guy Pensart
* @ instructions: gulp start
* @ ascii font: colosal
*
* # VARS
*
* --    General ... general
* --    Locations ... specific
* --    Pages ... specific
* --    Styling ... specific
* --    Javascript ... specific
* --    Environments ... environment
*
* # TASKS (do not run without configuration)
*
* --    Browser Sync... Browser preview with sync
* --    Pages ... html specific
* --    Styles ... sass specific
* --    Styles Linting ... directory has to exist to work
* --    Es6 Modules ... javascript specific
*
* # TASKS TO RUN!!!
* 
* --    gulp ... Logs all tasks that are available for execution
* --    gulp custom ... asks what jobs you want to perform and executes them 
* --    gulp clean ... deletes the buils directory and contents
* --    gulp logger ... examples formatted logs for future use
*
*/

/*
888  888  8888b.  888d888 .d8888b  
888  888     "88b 888P"   88K      
Y88  88P .d888888 888     "Y8888b. 
 Y8bd8P  888  888 888          X88 
  Y88P   "Y888888 888      88888P' 
*/

// --   General
const   gulp = require('gulp'),
        gulpif = require('gulp-if'),
        clean = require('gulp-clean'),
        gulpRename = require('gulp-rename'),
        plumber = require('gulp-plumber'),
        fs = require('fs'),
        inquirer = require("inquirer"),
        log4js = require('log4js'),
        logger = log4js.getLogger(),
        clc = require('cli-color'), 
        bs = require('browser-sync').create(); // bs instance
        //assign logger level
        logger.level = 'debug';

// --   Locations
const   set = {
            src: 'src',
            distBase: 'build',
            scripts: 'js',
            styles: 'styles',
        };       

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

// --   Environments
let     env = process.env.NODE_ENV;      

/*
888                      888               
888                      888               
888                      888               
888888  8888b.  .d8888b  888  888 .d8888b  
888        "88b 88K      888 .88P 88K      
888    .d888888 "Y8888b. 888888K  "Y8888b. 
Y88b.  888  888      X88 888 "88b      X88 
 "Y888 "Y888888  88888P' 888  888  88888P' 
*/

// --   Browser Sync
gulp.task('browser-sync', ['styles'], () => {
    bs.init({
        server: {
            baseDir: set.dist
        },
    });  
});

// --   Pages
gulp.task('pages', () => {
    var options = {
        "indent_size": 4,
        "indent_char": " ",
        "indent_with_tabs": false
    };
    gulp.src(set.src + '/' + '*.html')
        .pipe(gulpif( env === 'production', htmlmin({ collapseWhitespace: true }), htmlbeautify(options)))
        .pipe(gulp.dest(set.dist))
        .pipe(bs.reload({stream: true}));
});

// --   Styles
gulp.task('styles', () => {
    return gulp.src(set.src + '/' + set.styles + '/**/*.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sourceMaps.init())
        .pipe(sass(gulpif( env === 'production', {outputStyle: 'compressed'}, {outputStyle: 'nested'})).on('error', sass.logError))
        .pipe(autoPrefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulpif( env !== 'production', sourceMaps.write()))
        .pipe(gulp.dest(set.dist + '/' + set.styles))
        .pipe(bs.reload({stream: true}));
});

// --   Styles Linting
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

// --   Es6 Modules
gulp.task('es6Modules', () => {
    glob(set.src + '/' + set.scripts +'/bundle-**.js', function(err, files) {
        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry], debug: env !== 'production' })
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

        return es.merge.apply(null, tasks)
        .pipe(bs.reload({stream: true}));
    }) 
});

/*
888                      888                    888                                           
888                      888                    888                                           
888                      888                    888                                           
888888  8888b.  .d8888b  888  888 .d8888b       888888 .d88b.       888d888 888  888 88888b.  
888        "88b 88K      888 .88P 88K           888   d88""88b      888P"   888  888 888 "88b 
888    .d888888 "Y8888b. 888888K  "Y8888b.      888   888  888      888     888  888 888  888 
Y88b.  888  888      X88 888 "88b      X88      Y88b. Y88..88P      888     Y88b 888 888  888 
 "Y888 "Y888888  88888P' 888  888  88888P'       "Y888 "Y88P"       888      "Y88888 888  888 
*/

// --   Default provides info which tasks you can run
gulp.task('default', () => {
    console.log(clc.bold('AVAILABLE TASKS TO RUN'));
    console.log(clc.xterm(166)('gulp clean - deletes the builds directory'));
    console.log(clc.xterm(34)('gulp custom - select the jobs & tasks to perform'));
    
});

// --   Clean (delete the builds directory)
gulp.task('clean', () => {
    return gulp.src(set.distBase, {read: false})
        .pipe(clean({force:true}));
});

// --   Custom build or watch process
gulp.task('custom', () => {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'preview',
            message: 'Open a new browser sync window?\n! Choosing No will also loose\n- connection on existing instances!',
            default: false
        },
        {
            type: 'list',
            name: 'env',
            message: 'Select your environment...',
            choices: ['production', 'development']
        },
        {
            type: 'list',
            name: 'job',
            message: 'What Job to perform?',
            choices: ['build', 'watch', 'both','clean']
        },
        {
            type: 'checkbox',
            name: 'which',
            message: 'Select which tasks...',
            choices: ['pages', 'styles', 'es6Modules'],
        }
    ]).then((answers) => {
        // set environment
        env = answers.env;
        set.dist = set.distBase + '/' + answers.env;
        // Remove builds
        if(answers.job == 'clean') {
            gulp.start(answers.job);
        }
        // build tasks
        if(answers.job == 'build' || answers.job == 'both') {
            for(var value in answers.which) {
                gulp.start(answers.which[value]);
            }  
        }
        // watch tasks
        if(answers.job == 'watch' || answers.job == 'both') {
            if(answers.which.includes('pages')) {
                gulp.watch(set.src + '/*.html', ['pages']);
            }
            if(answers.which.includes('styles')) {
                gulp.watch(set.src + '/' + set.styles + '/**/*.scss', ['styles']);
            }
            if(answers.which.includes('es6Modules')) {
                gulp.watch('src/js/**/*.js', ['es6Modules']);
            }
        }
        // new browsersync instance?
        if(answers.job !== 'clean' && answers.preview !== false) {
            gulp.start('browser-sync');
        }   
        // logs for testing
        console.log('environment= ' + env);
        //console.log(JSON.stringify(answers, null, '  '));
    });
});

// --   Logger
gulp.task('logger', () => {
    // logging examples    
    logger.level = 'Debug example output.';
    logger.trace("Trace example output.");
    logger.debug("Debug example output.");
    logger.info("Info example output.");
    logger.warn("Warn example output.");
    logger.error("Error example output.");
    logger.fatal("Fatal example output.");
});
