var gulp = require('gulp');
	gutil = require('gulp-util');
	sass = require('gulp-sass');
	plumber = require('gulp-plumber');
	notify = require("gulp-notify");
	minify = require('gulp-minifier');
	gulpsync = require('gulp-sync')(gulp);
	browserSync = require('browser-sync').create();
	stylesDestination = 'assets/css/';
	inputScss = 'assets/scss/**/*.scss';

gutil.log(gutil.colors.blue('Runing'));

/*------- Browser sync with changes -------*/
gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: "http://localhost/guatevoz/"
	});
});

/*------- sass -------*/
gulp.task('sass', function() {
	return gulp.src('assets/scss/*.scss')
	.pipe(sass({outputStyle: 'compressed'}))
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while compiling sass.\nLook in the console for details.\n' + 'File: ' + error.file.replace(/^.*[\\\/]/, '') + '\nLine: ' + error.line + '\nMessage: ' + error.message.replace(/  +/g, ' ').replace(/\t/g, '');
		}))
	.pipe(gulp.dest(stylesDestination))
	.pipe(browserSync.stream())
});

/*------- Watch for change -------*/
gulp.task('watch', function() {
	return gulp
	.watch(inputScss, gulpsync.sync(['sass']))
		.on('change', function(event) {
			browserSync.reload
			gutil.log(gutil.colors.yellow('File ' + event.path.replace(/^.*[\\\/]/, '') + ' was ' + event.type + ', running tasks...'));
		});
});

gulp.task('default', gulpsync.sync(['sass', ['watch', 'browser-sync']]));