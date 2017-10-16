"use strict";

const gulp    = require("gulp"),
      sass    = require("gulp-sass"),
      plumber = require("gulp-plumber"),
      notify  = require("gulp-notify"),
      csso    = require("gulp-csso"),
      config  = require("../gulp.config"),
      concat  = require("gulp-concat");

/**
 * Task to compile the scss files to css
 * =============================================================================
 * This is applicable only to sass files that are created manually as well as
 * the vendor libraries that support sass file formats.
 *
 *
 * @return {[type]} [description]
 */
gulp.task("build-scss", function() {
  return gulp.src(config.sourceStylesDir + "/layout.scss")
    .pipe(sass({outputStyle: "compressed"})
    .on("error", sass.logError))
    // saves it in the ./build/css/ directory
    .pipe(gulp.dest(config.targetStylesDir));
});


/**
 * Task to group and minify the css files from vendor libraries
 * =============================================================================
 * This is applicable only to those vendor libraries that dont have support
 * for scss.
 *
 * @param  {[type]} "build-css"    [description]
 * @param  {[type]} function (             [description]
 * @return {[type]}          [description]
 */
gulp.task("build-css", function() {
  // Grabs all the css files listed
  return gulp.src([
    config.bowerDir + "/animate.css/animate.css",
    config.bowerDir + '/datatables/media/css/dataTables.bootstrap.css',
    config.nodeDir + '/angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.min.css',
    config.nodeDir + "/angular-toastr/dist/angular-toastr.css",
    config.nodeDir + "/angular-loading-bar/build/loading-bar.css",
    /** bootstrap datepicker **/
    config.bowerDir + "/bootstrap-datepicker/dist/css/bootstrap-datepicker.css",
    // Add all vendor css libraries here
    /** oi select **/
    config.nodeDir + "/oi.select/dist/select.css",
    /** Sweet alert **/
    config.nodeDir + "/sweetalert/lib/sweet-alert.css",
  ])
  .pipe(plumber())
  // Concat them into a single file
  .pipe(concat("vendor.min.css"))
  // minify them
  .pipe(csso())
  // saves it in the public/css/ directory
  .pipe(gulp.dest(config.targetStylesDir));
});
