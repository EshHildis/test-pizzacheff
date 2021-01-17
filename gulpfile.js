const gulp = require('gulp');
const browserSync = require('browser-sync');
const fileinclude = require('gulp-file-include');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const pug = require('gulp-pug');
const imageMin = require('gulp-image');

/* 
	HTML
*/
gulp.task('html', function () {
	browserSync.notify('Compiling HTML');

	return gulp.src(['app/*.pug', '!app/_*.pug'])
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'HTML',
				message: err.message
			}))
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.reload({ stream: true }))
});

/*
	CSS
*/
gulp.task('css', function () {
	return gulp.src(['app/scss/**/*.scss', '!app/scss/**/_*.scss', 'app/scss/**/*.sass', '!app/scss/**/_*.sass', '!app/scss/libs*.scss'])
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'CSS',
				message: err.message
			}))
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream())
});

gulp.task('css-libs', function () {
	return gulp.src('app/scss/libs*.scss')
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'CSS Libs',
				message: err.message
			}))
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream())
});


gulp.task('css-build', function () {
	return gulp.src(['app/scss/**/*.scss', '!app/scss/**/_*.scss', 'app/scss/**/*.sass', '!app/scss/**/_*.sass', '!app/scss/libs*.scss'])
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'CSS',
				message: err.message
			}))
		}))
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream())
});

gulp.task('css-libs-build', function () {
	return gulp.src('app/scss/libs*.scss')
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'CSS Libs',
				message: err.message
			}))
		}))
		.pipe(sass())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream())
});

/*
	JavaScript
*/
gulp.task('js', function () {
	browserSync.notify('Compiling internal JS');

	return gulp.src(['app/js/**/*.js', '!app/js/**/_*.js', '!app/js/libs*.js'])
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'JS',
				message: err.message
			}))
		}))
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			indent: true
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('js-libs', function () {
	browserSync.notify('Compiling external JS');

	return gulp.src('app/js/libs.js')
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'JS Libs',
				message: err.message
			}))
		}))
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			indent: true
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('js-build', function () {
	browserSync.notify('Compiling internal JS');

	return gulp.src(['app/js/**/*.js', '!app/js/**/_*.js', '!app/js/libs*.js'])
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'JS',
				message: err.message
			}))
		}))
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			indent: true
		}))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('js-libs-build', function () {
	browserSync.notify('Compiling external JS');

	return gulp.src('app/js/libs.js')
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'JS Libs',
				message: err.message
			}))
		}))
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			indent: true
		}))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('js'))
		.pipe(browserSync.reload({ stream: true }))
});

/*
	ASSEST + MINIFY PICTURES
*/

gulp.task('image-min', async function () {
	gulp.src('./app/assets/images/**/*.*')
		.pipe(imageMin({
			pngquant: true,
			optipng: false,
			zopflipng: true,
			jpegRecompress: false,
			mozjpeg: true,
			gifsicle: true,
			svgo: false,
			concurrent: 10,
			quiet: false
		}))
		.pipe(gulp.dest('assets/images'))
});

gulp.task('assets', function () {
	return gulp.src(['app/assets/**/*.*'])
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'assets',
				message: err.message
			}))
		}))
		.pipe(gulp.dest('assets'))
		.pipe(browserSync.reload({ stream: true }))
});

/*
	ADDITIONAL TASKS
*/

gulp.task('webserver', function () {
	browserSync({
		server: {
			baseDir: './'
		},
		notify: true
	});
});

gulp.task('clean', function () {
	return del(['dist/*']);
});

gulp.task('minify', function () {
	return gulp.src(['css/*.css', '!css/libs.min.css'])
		.pipe(cssnano())
		.pipe(gulp.dest('css'));
})

/* 
	GULP TASKS
*/
gulp.task('watch', function () {
	gulp.watch(['app/scss/**/*.scss', '!app/scss/libs*.scss', 'app/components/**/*.scss', 'app/components/**/*.sass', 'app/elements/**/**/*.scss'], gulp.series('css'));
	gulp.watch('app/scss/libs*.scss', gulp.parallel('css-libs'));
	gulp.watch('app/**/*.pug', gulp.series('html'));
	gulp.watch(['app/js/**/*.js', '!app/js/libs*.js', 'app/components/**/*.js', 'app/elements/**/*.js'], gulp.series('js'));
	gulp.watch('app/js/libs*.js', gulp.series('js-libs'));
	gulp.watch(['app/assets/**/*.*'], gulp.parallel('assets'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('assets', 'image-min', 'html', 'css-build', 'css-libs-build', 'js-build', 'js-libs-build')));
gulp.task('create', gulp.series('clean', gulp.parallel('assets', 'html', 'css', 'css-libs', 'js', 'js-libs')));
gulp.task('default', gulp.series('create', gulp.parallel('webserver', 'watch')));