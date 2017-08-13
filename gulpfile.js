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
* --    Environment ... environment
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
* --    gulp ... asks what jobs you want to perform and executes them 
* --    gulp info ... Logs all tasks that are available for execution
* --    gulp clean ... deletes the builds directory and contents
* --    gulp logger ... examples of formatted logs for future use
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
        
// --   Conditions
const   check = {
            reqVals: () => { if(!set.env && !set.dist){gulp.start('info')} }
        }

// --   Messages
const   msg = {
            availableTasks: () => {
                console.log(
                    clc.bold('\n! AVAILABLE TASKS TO RUN\n') +
                    clc.xterm(34)('gulp (default) - select the jobs & tasks to perform\n') +
                    clc.xterm(166)('gulp clean - deletes the builds directory\n')
                );
                process.exit();
            }
        }        

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
gulp.task('browser-sync', () => {
    check.reqVals(); 
    bs.init({
        server: {
            baseDir: set.dist
        },
    });  
});

// --   Pages
gulp.task('pages', () => {
    check.reqVals();
    var options = {
        "indent_size": 4,
        "indent_char": " ",
        "indent_with_tabs": false
    };
    gulp.src(set.src + '/' + '*.html')
        .pipe(gulpif( set.env === 'production', htmlmin({ collapseWhitespace: true }), htmlbeautify(options)))
        .pipe(gulp.dest(set.dist))
        .pipe(bs.reload({stream: true}));
});

// --   Styles
gulp.task('styles', () => {
    check.reqVals();
    return gulp.src(set.src + '/' + set.styles + '/**/*.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sourceMaps.init())
        .pipe(sass(gulpif( set.env === 'production', {outputStyle: 'compressed'}, {outputStyle: 'nested'})).on('error', sass.logError))
        .pipe(autoPrefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulpif( set.env !== 'production', sourceMaps.write()))
        .pipe(gulp.dest(set.dist + '/' + set.styles))
        .pipe(bs.reload({stream: true}));
});

// --   Styles Linting
gulp.task('styles-lint', () => {
    check.reqVals();
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
    check.reqVals();
    glob(set.src + '/' + set.scripts +'/bundle-**.js', function(err, files) {
        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry], debug: set.env !== 'production' })
                .transform('babelify', {
                    presets: ['es2015']
                })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(gulpRename({
                    dirname: set.scripts,
                }))
                .pipe(gulpif( set.env === 'production', uglify()))
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
gulp.task('info', () => {
    msg.availableTasks();
});

// --   Clean (delete the builds directory)
gulp.task('clean', () => {
    return gulp.src(set.distBase, {read: false})
        .pipe(clean({force:true}));
});

// --   Custom build or watch process

// --   Logger
gulp.task('logger', () => {
    // logging examples    
    logger.level = 'Debug example output.';
    logger.trace("Trace example output.");
    logger.debug("Debug example output.");
    logger.info("Info example output.");
    process.exit();
    logger.warn("Warn example output.");
    logger.error("Error example output.");
    logger.fatal("Fatal example output.");
});

gulp.task('default', () => {
    // Selecting the environment or cleaning
    selStart = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'job',
                message: 'What Job to perform?',
                choices: ['production', 'development','clean'],
            }
        ]).then((answer) => {
            if(answer.job === 'clean') {
                gulp.start('clean');
                console.log(clc.redBright('Removed all builds!'));
            } else {
                set.env = answer.job;
                set.dist = set.distBase + '/' + answer.job;
                selOptions();
            }
        })
    }
    // All options or selected
    selOptions = () => {
        inquirer.prompt([
            {
                type: 'checkbox',
                name: 'tasks',
                message: 'Select which tasks...',
                choices: ['run all', 'build', 'watch', 'browserSync'],
                validate: function (answer) {
                    if (answer.length < 1) {
                      return 'You must choose at least one...';
                    }
                    return true;
                }
            }
        ]).then((answer) => {
            if(answer.tasks.includes('run all')) {
                answer.tasks.push('build', 'watch', 'browserSync');
            }
            if(answer.tasks.includes('build')) {
                gulp.start('pages');
                gulp.start('styles');
                gulp.start('es6Modules');
            }
            if(answer.tasks.includes('watch')) {
                gulp.watch(set.src + '/*.html', ['pages']);
                gulp.watch(set.src + '/' + set.styles + '/**/*.scss', ['styles']);
                gulp.watch('src/js/**/*.js', ['es6Modules']);
            }
            if(answer.tasks.includes('browserSync')) {
                gulp.start('browser-sync');
            }

            // log for debugging
            console.log(JSON.stringify(answer, null, '  '));
        })
    }

    selStart();

});