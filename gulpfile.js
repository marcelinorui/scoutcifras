var gulp = require('gulp');
var fs = require('fs');
var args = require('yargs').argv;
var merge = require('merge-stream');
var source = require('vinyl-source-stream');
var path = require('path');
var pump = require('pump');

var $ = require('gulp-load-plugins')({
    lazy: true,
    pattern: [
        'gulp-*', 'gulp.*',
        'main-bower-files',
        'uglify-save-license',
        'del',
        'merge-stream',
        'run-sequence'
    ]
});

var config = {
    libpath: './node_modules',
    csspath: './css',
    less: './less',
    fontpath: './fonts',
    tmppath: './tmp',
    jspath: './js'
};

function checkExistsDir(name) {
    try {
        fs.accessSync(name);
        return true;
    } catch (e) {
        return false;
    }
}

function clean(path) {
    return gulp.src(path)
        .pipe(verbosePrintFiles('clean'))
        .pipe($.clean());
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.white(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.white(msg));
    }
}


function verbosePrintFiles(taskName) {
    return $.if(isVerbose, $.print(function (filepath) {
        return '[' + taskName + '] ' + filepath.replace('less\\', '');
    }));
}


function buildLess(src, options, dst) {
    if (!dst) { dst = config.tmppath; }

    return gulp
        .src(src)
        .pipe($.less(options))
        .pipe($.rename({ extname: '.css' }))
        .pipe($.cleanCss({}))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(dst));
}


function buildCss(name, output) {
    return gulp.src([config.tmppath + '/*.css'])
        .pipe($.concat(name+'.css'))
        .pipe($.cleanCss({ debug: true },
            function (details) {
                if (isVerbose) {
                    log('Minify CSS:' + details.name + ': ' +
                         '\r\n\t\tOriginal: ' + $.util.colors.magenta(details.stats.originalSize) + ' bytes' +
                         '\r\n\t\t   Final: ' + $.util.colors.magenta(details.stats.minifiedSize) + ' bytes' +
                         '\r\n\t\t\t  ' + $.util.colors.magenta(100 - ((details.stats.minifiedSize * 100) / details.stats.originalSize)) + ' %');
                }
            })
        )
        .pipe($.rename({
            basename: name,
            suffix: '.min'
        }))
        .pipe(gulp.dest(output));
}


/************************************/
/*               Tasks              */
/************************************/
gulp.task('build-less-bootstrap-theme', false, function () {
    return buildLess(config.less + '/theme.less', {}, config.tmppath + '/');
});

gulp.task('build-less-bootstrap', false, function () {
    return buildLess(config.less + '/bootstrap.less', {}, config.tmppath + '/');
});

gulp.task('clean-css', false, function () {
    return clean([config.tmppath, config.csspath]);
});

gulp.task('build-less',['build-less-bootstrap','build-less-bootstrap-theme'],function(){})
