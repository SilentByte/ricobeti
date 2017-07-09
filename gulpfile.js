//
// Gulp Build File
//

'use strict';

const gulp = require('gulp');

const concat = require('gulp-concat');
const handlebars = require('gulp-compile-handlebars')
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const bs = require('browser-sync').create();
const composer = require('gulp-composer');
const YAML = require('yamljs');

const fs = require('fs');


const loadAnalyticsCode = function() {
    if(!fs.existsSync('./src/analytics.js')) {
        return '';
    }

    return '<script>'
        + fs.readFileSync('./src/analytics.js', 'utf8')
        + '</script>';
};

process.env['COMPOSER_VENDOR_DIR'] = './dist/mail/vendor';


gulp.task('copy:static', function() {
    return gulp.src([
            './static/**/*',
            './static/.htaccess'
        ])
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build:html', function() {
    const meta = YAML.load('./src/meta.yml');

    return gulp.src('./src/index.hbs')
        .pipe(handlebars(meta, {
            batch : ['./src/partials/'],
            partials: {
                analytics: loadAnalyticsCode()
            }
        }))
        .pipe(rename('index.html'))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(bs.stream());
});

gulp.task('dev:html', function() {
    const meta = YAML.load('./src/meta.yml');

    return gulp.src('./src/index.hbs')
        .pipe(handlebars(meta, {
            batch : ['./src/partials/'],
            partials: {
                analytics: loadAnalyticsCode()
            }
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist/'))
        .pipe(bs.stream());
});

gulp.task('build:css', function() {
    return gulp.src('./src/scss/portfolio.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(bs.stream());
});

gulp.task('dev:css', function() {
    return gulp.src('./src/scss/portfolio.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(bs.stream());
});

gulp.task('build:js', function() {
    return gulp.src([
            './src/js/typed.js',
            './src/js/portfolio.js'
        ])
        .pipe(concat('portfolio.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'))
        .pipe(bs.stream());
});

gulp.task('dev:js', function() {
    return gulp.src([
            './src/js/typed.js',
            './src/js/portfolio.js'
        ])
        .pipe(concat('portfolio.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(bs.stream());
});

gulp.task('build:mail', function() {
    composer('install', {
        'async': false,
        'no-dev': true,
        'optimize-autoloader': true
    });

    return gulp.src('./src/mail/*.php')
        .pipe(gulp.dest('./dist/mail'));
});

gulp.task('dev:mail', function() {
    composer({
        'async': false
    });
    return gulp.src('./src/mail/**/*.php')
        .pipe(gulp.dest('./dist/mail'));
});

gulp.task('bs', function() {
    bs.init({
        open: false,
        notify: false,
        server: {
            baseDir: './dist/'
        },
        reloadDelay: 500
    })
});

gulp.task('build', [
    'copy:static',
    'build:html',
    'build:css',
    'build:js',
    'build:mail'
]);

gulp.task('dev', [
    'copy:static',
    'dev:html',
    'dev:css',
    'dev:js',
    'dev:mail'
]);

gulp.task('serve', ['bs', 'dev'], function() {
    gulp.watch('./static/**/*', ['copy:static']);
    gulp.watch('./src/**/*.hbs', ['dev:html']);
    gulp.watch('./src/**/*.scss', ['dev:css']);
    gulp.watch('./src/**/*.js', ['dev:js']);
    gulp.watch('./src/meta.yml', ['dev']);
    gulp.watch('./src/mail/index.php', ['dev:mail']);
});

gulp.task('default', ['build']);

