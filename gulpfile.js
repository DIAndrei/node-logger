'use strict';

const gulp = require('gulp');
const typescript = require('gulp-typescript');
const rm = require('gulp-rimraf');
const tslint = require('gulp-tslint');
const sequence = require('gulp-sequence');

/**
 * Define tasks.
 */
gulp.task('clean', () => {
    return gulp.src(['build/'], { read: false }).pipe(rm());
});

gulp.task('tslint', () => {
    return gulp.src([
        'src/**/*.ts'
    ])
        .pipe(tslint({
            formatter: 'verbose',
            configuration: 'tslint.json'
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});

gulp.task('compile', () => {
    let ts = typescript.createProject('tsconfig.json', {
        declaration: true
    });
    return gulp.src([
        'src/**/*.ts'
    ])
        .pipe(ts())
        .pipe(gulp.dest('build/'));
});

gulp.task('tests', () => {
    return gulp.src([
        'build/tests/**/*.js'
    ], { read: false })
        .pipe(mocha());
});

/**
 * Register tasks.
 */
gulp.task('build', sequence('clean', 'tslint', 'compile'));

gulp.task('default', ['build']);