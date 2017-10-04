var gulp = require('gulp');
var sass = require('gulp-sass');

var metalsmith = require('gulp-metalsmith');

var sassDir = './sass/**';
var pageDir = './pages/**';

gulp.task('sass', function(){
		return gulp.src(sassDir)
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('docs/css'));
});

gulp.task('metalsmith', function(){
		return gulp.src(pageDir)
			.pipe(metalsmith())
			.pipe(gulp.dest('docs'));
});

gulp.task('default', function(){
	gulp.watch(sassDir, ['sass']);
	gulp.watch(pageDir, ['metalsmith']);
});