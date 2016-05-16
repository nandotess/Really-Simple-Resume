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

// STYLES

gulp.task('styles', function() {
	return sass('app/styles/main.scss', { style: 'expanded' })
		.pipe(gulp.dest('dist/styles'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('styles-watch', ['styles'], browserSync.reload);

// SCRIPTS

gulp.task('scripts', function() {
	return gulp.src('app/scripts/app.js')
		.pipe(foreach(function(stream, file) {
			return stream
				.pipe(resolveDependencies({
					pattern: /\* @requires [\s-]*(.*\.js)/g
				}))
				.pipe(concat(path.basename(file.path)));
		}))
		.pipe(gulp.dest('dist/scripts'));
		//.pipe(rename({ suffix: '.min' }))
		//.pipe(uglify())
		//.pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts-watch', ['scripts'], browserSync.reload);

// IMAGES

gulp.task('images', function() {
	return gulp.src('app/images/**/*')
		.pipe(gulp.dest('dist/images'));
});

// SVG

gulp.task('svg', function() {
	return gulp.src('app/svgs/*.svg')
		.pipe(gulp.dest('dist/svgs'));
});

gulp.task('svg-watch', ['svg'], browserSync.reload);

// HTML

gulp.task('html', function() {
	return gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('html-watch', ['html'], browserSync.reload);

// JSON DATA

gulp.task('json', function() {
	return gulp.src('app/jsons/*.json')
		.pipe(gulp.dest('dist/jsons'));
});

gulp.task('json-watch', ['json'], browserSync.reload);

// ROOT FILES

gulp.task('root-files', function() {
	return gulp.src(['app/.htaccess', 'app/favicon.ico'])
		.pipe(gulp.dest('dist'));
});

gulp.task('root-files-watch', ['root-files'], browserSync.reload);

// CLEAN DIST / BUILD DIST

gulp.task('clean', function() {
	return del(['dist']);
});

gulp.task('deploy', ['clean'], function() {
	gulp.start('styles', 'scripts', 'images', 'svg', 'html', 'json', 'root-files');
});

// WATCH SOURCE CHANGES

gulp.task('watch', function() {
	gulp.watch('app/styles/**/*.scss', ['styles-watch']);
	gulp.watch('app/scripts/**/*.js', ['scripts-watch']);
	gulp.watch('app/images/**/*', ['images-watch']);
	gulp.watch('app/svgs/*.svg', ['svg-watch']);
	gulp.watch('app/*.html', ['html-watch']);
	gulp.watch('app/jsons/*.json', ['json-watch']);
	gulp.watch(['app/.htaccess','app/favicon.ico'], ['root-files-watch']);
});

// SERVER

gulp.task('server', ['deploy'], function() {
	browserSync({ server: { baseDir: 'dist' } });
	gulp.start('watch');
});
