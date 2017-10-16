"use strict";

const gulp        = require("gulp");

/**
 * Path referencs to files
 * =============================================================================
 *
 * @type {Object}
 */
const paths = {
    pages: ["src/*.html"]
};

/**
 * Copy html file and paste it to build folder
 * =============================================================================
 *
 * @return {[type]} [description]
 */
gulp.task("copy-html", function() {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("build"));
});
