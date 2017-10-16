"use strict";

const gulp    = require("gulp"),
      bower   = require("gulp-bower"),
      config  = require("../gulp.config");

/**
 * Task will pull down the latest bower dependencies
 * =============================================================================
 *
 * @param  {[type]} "bower"   [description]
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
gulp.task("bower", function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});
