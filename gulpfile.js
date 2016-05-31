'use strict';

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	del = require('del'),
	browserSync = require('browser-sync'),
	resolveDependencies = require('gulp-resolve-dependencies'),
	concat = require('gulp-concat'),
	foreach = require('gulp-foreach'),
	path = require('path');

// CSS

gulp.task('css', function() {
	return sass('app/css/style.scss', { style: 'expanded' })
		.pipe(gulp.dest('dist/css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('css-watch', ['css'], browserSync.reload);

// JS

gulp.task('js', function() {
	return gulp.src('app/js/**/*')
		.pipe(foreach(function(stream, file) {
			return stream
				.pipe(resolveDependencies({
					pattern: /\* @requires [\s-]*(.*\.js)/g
				}))
				.pipe(concat(path.basename(file.path)));
		}))
		.pipe(gulp.dest('dist/js'));
		//.pipe(rename({ suffix: '.min' }))
		//.pipe(uglify())
		//.pipe(gulp.dest('dist/js'));
});

gulp.task('js-watch', ['js'], browserSync.reload);

// SVG

gulp.task('svg', function() {
	return gulp.src('app/svg/**/*')
		.pipe(gulp.dest('dist/svg'));
});

gulp.task('svg-watch', ['svg'], browserSync.reload);

// JSON

gulp.task('json', function() {
	return gulp.src('app/json/**/*')
		.pipe(gulp.dest('dist/json'));
});

gulp.task('json-watch', ['json'], browserSync.reload);

// HTML

gulp.task('html', function() {
	return gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('html-watch', ['html'], browserSync.reload);

// ROOT FILES

gulp.task('root-files', function() {
	return gulp.src(['app/.htaccess', 'app/favicon.ico'])
		.pipe(gulp.dest('dist'));
});

gulp.task('root-files-watch', ['root-files'], browserSync.reload);

// IMAGES

gulp.task('images', function() {
	return gulp.src('app/images/**/*')
		.pipe(gulp.dest('dist/images'));
});

// CLEAN DIST / BUILD DIST

gulp.task('clean', function() {
	return del(['dist']);
});

gulp.task('deploy', ['clean'], function() {
	gulp.start('css', 'js', 'svg', 'json', 'html', 'root-files', 'images');
});

// WATCH SOURCE CHANGES

gulp.task('watch', function() {
	gulp.watch('app/css/**/*', ['css-watch']);
	gulp.watch('app/js/**/*', ['js-watch']);
	gulp.watch('app/svg/**/*', ['svg-watch']);
	gulp.watch('app/json/**/*', ['json-watch']);
	gulp.watch('app/*.html', ['html-watch']);
	gulp.watch(['app/.htaccess','app/favicon.ico'], ['root-files-watch']);
	gulp.watch('app/images/**/*', ['images-watch']);
});

// SERVER

gulp.task('server', ['deploy'], function() {
	browserSync({ server: { baseDir: 'dist' } });
	gulp.start('watch');
});
