const gulp = require('gulp');
const sass = require('gulp-sass');
const fs = require('fs');

const gulpsmith = require('gulpsmith');
const markdown = require('metalsmith-markdownit');
const layouts = require('metalsmith-layouts');

const sassDir = './src/sass/**';
const pageDir = './src/pages/**';

const config = JSON.parse(fs.readFileSync('./config.json'));

gulp.task('sass', function(){
		return gulp.src(sassDir)
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('docs/styles'));
});

gulp.task('metalsmith', function(){
		return gulp.src(pageDir)
			.pipe(gulpsmith()
				.metadata(config.metalsmith)
				.use(markdown())
				.use(layouts(config.layouts)))
			.pipe(gulp.dest('docs'));
});

gulp.task('default', function(){
	gulp.watch(sassDir, ['sass']);
	gulp.watch(pageDir, ['metalsmith']);
});