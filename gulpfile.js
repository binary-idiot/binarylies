//region REQUIRES
const gulp        = require('gulp');
const sass        = require('gulp-sass');
const size        = require('gulp-size');

const runSequence = require('run-sequence');
const fs          = require('fs');
const del         = require('del');
const browserSync = require('browser-sync').create();

const gulpsmith   = require('gulpsmith');
const markdown    = require('metalsmith-markdownit');
const layouts     = require('metalsmith-layouts');

//endregion

//region DIRECTORIES
const SASS_DIR  = './src/sass/**';
const PAGE_DIR  = './src/pages/**';

const BUILD_DIR = './docs';

const config   = JSON.parse(fs.readFileSync('./config.json'));

//endregion

//region TASKS

gulp.task('default', function(callback){
	runSequence('clean', ['sass', 'metalsmith'], 'serve', callback);
});

gulp.task('serve', function(){
	browserSync.init({
		server: BUILD_DIR
	});

	gulp.watch(SASS_DIR, ['sass']);
	gulp.watch(PAGE_DIR, ['metalsmith']);
});

//endregion

//region BUILD TASKS
gulp.task('sass', function(){
		return gulp.src(SASS_DIR)
			.pipe(sass().on('error', sass.logError))
			.pipe(size())
			.pipe(gulp.dest(BUILD_DIR + '/styles'))
			.pipe(browserSync.stream());
});

gulp.task('metalsmith', function(){
		return gulp.src(PAGE_DIR)
			.pipe(gulpsmith()
				.metadata(config.metalsmith)
				.use(markdown())
				.use(layouts(config.layouts)))
			.pipe(size())
			.pipe(gulp.dest(BUILD_DIR))
			.pipe(browserSync.stream());
});

//endregion

//region CLEAN TASKS
gulp.task('clean', function(callback){
	return runSequence(['clean-styles', 'clean-html'], callback);
});

gulp.task('clean-styles', function(){
	return del([BUILD_DIR + '/styles/**/*']);
});

gulp.task('clean-html', function(){
	return del([BUILD_DIR + '/**/*.html']);
});


//endregion