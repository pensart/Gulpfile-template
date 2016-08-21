var gulp = require('gulp'),
    plumber = require('gulp-plumber');
var sass = require('gulp-sass');

gulp.task('styles', function(){
  gulp.src(['src/styles/scss/main.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(gulp.dest('dist/styles/'))
});

gulp.task('default', function(){
  gulp.watch("src/styles/**/*.scss", ['styles']);
});