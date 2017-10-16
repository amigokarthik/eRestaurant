"use strict";

const gulp    = require("gulp"),
    config  = require("../gulp.config");

/**
 * Copy icons to build folder
 * =============================================================================
 *
 * @return {[type]} [description]
 */
gulp.task("copy-icons", function() {
  return gulp.src([
    config.bowerDir + "/bootstrap-sass/assets/fonts/bootstrap/**.*",
    config.bowerDir + "/font-awesome/fonts/**.*",
    config.bowerDir + "/simple-line-icons/fonts/**.*"
  ])
  .pipe(gulp.dest(config.targetFontsDir));
});


/**
 * Copy images to build folder
 * =============================================================================
 *
 * @return {[type]} [description]
 */
gulp.task("copy-images", function() {
    return gulp.src([
      // config.bowerDir + "/bootstrap-formhelpers/dist/img/*.*",
      "./src/assets/images/*.*"
    ])
    .pipe(gulp.dest(config.targetImagesDir));
});
