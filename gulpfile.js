// -- Settings

var set = {
    src: 'src',
    dist: 'dist',
    styles: 'styles',
};

// -- requirements

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass');

gulp.task('styles', function(){
  gulp.src( set.src + '/' + set.styles + '/**/*.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe( gulp.dest( set.dist + '/' + set.styles ))
});

gulp.task('default', function(){
  gulp.watch( set.src + '/' + set.styles + '/**/*.scss', ['styles']);
});