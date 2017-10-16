"use strict";

const gulp        = require("gulp"),
      connect     = require("gulp-connect"),
      config      = require("../gulp.config"),
      browserify  = require("browserify"),
      streamify   = require("gulp-streamify"),
      source      = require("vinyl-source-stream"),
      uglify      = require("gulp-uglify"),
      concat      = require("gulp-concat"),
      gutil       = require("gulp-util"),
      babelify    = require("babelify"),
      es2015      = require("babel-preset-es2015"),
      argv        = require("yargs").argv,
      gulpif      = require("gulp-if");

/**
 * Building the application file
 * =============================================================================
 * This is applicable only for the custom created components
 *
 * @param  {[type]} "browserify" [description]
 * @param  {[type]} function(    [description]
 * @return {[type]}              [description]
 */
gulp.task("build-application", function() {
  // Name of the output file
  const libraryName = "bundle";

  // Root application file to load
  const mainJsFilePath = "./src/app/app.js";

  // Name of the output minifed file
  const outputFileName = libraryName + ".min.js";

  // Grabs the app.js file
  return browserify(mainJsFilePath)
  // Transforming es6 to es5 code for minification
  .transform(babelify, { presets: [es2015] })
  // bundles it and creates a file called main.js
  .bundle()
  // create the source file
  .pipe(source(outputFileName))
  // saves it in the public/js/ directory
  .pipe(gulp.dest(config.targetScriptsDir));
});

/**
 * Task to group and minify the js files from vendor libraries
 * =============================================================================
 * This is applicable only to those vendor libraries
 *
 * @param  {[type]} "js-vendor" [description]
 * @param  {[type]} function(   [description]
 * @return {[type]}             [description]
 */
gulp.task("build-vendor", function() {
  // Grabs the all js files listed
  return gulp.src([
    config.bowerDir + "/googlemaps/googleapi.js",
    config.bowerDir + "/jquery/dist/jquery.js",
    config.bowerDir + '/datatables/media/js/jquery.dataTables.js',
    config.bowerDir + '/datatables/media/js/dataTables.bootstrap.js',
    config.bowerDir + "/bootstrap-sass/assets/javascripts/bootstrap.js",
    config.bowerDir + "/underscore/underscore.js",
    config.bowerDir + "/moment/moment.js",
    /** bootstrap datepicker **/
   config.nodeDir + "/bootstrap-datepicker/dist/js/bootstrap-datepicker.js",
    /** timezones **/
    config.bowerDir + "/moment-timezone/builds/moment-timezone-with-data.js",
    /** Sweet alert **/
  config.nodeDir + "/sweetalert/lib/sweet-alert.js",
    // Custom styles
    "./src/assets/js/app.js"
    // Add all vendor js libraries here
  ])
  // bundles it and creates a file called vendor.min.js
  .pipe(concat("vendor.min.js"))
  // minify the vendor.min.js file
  .pipe(uglify())
  // saves it in the public/js/ directory
  .pipe(gulp.dest(config.targetScriptsDir));
});
