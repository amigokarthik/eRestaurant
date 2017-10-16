"use strict";

const gulp          = require("gulp"),
      plumber       = require("gulp-plumber"),
      config        = require("../gulp.config"),
      templateCache = require("gulp-angular-templatecache");

/**
 * Caching angular templates
 * =============================================================================
 *
 * @return {[type]} [description]
 */
gulp.task("build-templates", function() {
  // Grab all the html files
  return gulp.src([
    config.sourceScriptsDir + "/**/*.html",
    config.sourceScriptsDir + "/**/**/*.html"
  ])
  // convert them into cached tempaltes
  .pipe(templateCache("templatescache.js", {
    standalone: true,
    module: "templatescache",
    root: "./app/"
  }))

  // saves it in the app/js directory
  .pipe(gulp.dest(config.sourceScriptsDir + "/"));
});
