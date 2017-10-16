"use strict";

/*
 * gulpfile.js
 * =============================================================================
 * This file is responsible for building the application structure based on the
 * configurations set below.
 *
 * The default task is mapped to run the watch task
 */
const fs          = require("fs"),
      path        = require("path"),
      gulp        = require("gulp"),
      concat      = require("gulp-concat"),
      config      = require("./gulp/gulp.config"),
      browserSync = require("browser-sync").create(),
      clean       = require("gulp-clean"),
      runSequence = require("run-sequence");

// Production check flag
global.isProd = false;

// Only gets the js files
const tasks = fs.readdirSync("./gulp/tasks/").filter(function(name) {
  return /(\.(js)$)/i.test(path.extname(name));
});

/**
 * Import all the gulp tasks present in the gulp/tasks folder
 * Add new tasks that you need to execute under gulp/tasks folder and
 * the configurations for those can be added inside the gulp.config.js file
 *
 * @param  {[type]} (task [description]
 * @return {[type]}       [description]
 */
tasks.forEach((task) => {
  // Grabs all the tasks from the tasks folder
  require(config.tasksDir + task);
});

// Watch for tasks that are liable to changes
gulp.task("watch", function() {
  // Watches for changes in js files and runs the browserify task
  gulp.watch([
    // Watch for changes under the js folder
    config.sourceScriptsDir + "/**/*.js",
    // Watch for changes under the js sub folders
    config.sourceScriptsDir + "/**/**/*.js"],
    ["build-application"]);

  // Watches for changes in the template files and runs the templates task
  gulp.watch([
    config.sourceScriptsDir + "/**/*.html",
    config.sourceScriptsDir + "/**/**/*.html"],
    ["build-templates"]);

  // Watches for changes in style.scss and runs the scss task
  gulp.watch([
    // Watch for changes of sccs files under the styles folder
    config.sourceStylesDir + "/*.scss",
    // Watch for changes of sccs files under the styles sub folder
    config.sourceStylesDir + "/**/*.scss"],
    ["build-scss"]);
});


/**
 * Clean the build directory
 * =============================================================================
 * This task will clean the js folder in the build files list
 *
 * @return {[type]} [description]
 */
gulp.task("build-clean", ["copy-html"], function() {
  return gulp.src(config.targetScriptsDir, {read: false})
          .pipe(clean());
});

/**
 * Default task for gulp
 * =============================================================================
 * This is the default task that runs when "gulp" command is executed on the
 * command line. You can also call the specific task to trigger from the list
 * below if required.
 */
 gulp.task("default", function(callback) {
   runSequence(
     "build-clean",
     "build-templates",
     ["build-scss", "build-css"],
     ["copy-icons", "copy-images"],
     "build-vendor",
     "build-application",
   callback);
 });

/**
 * Task to run for Development setup
 * =============================================================================
 * This task is to be used only for Development purpose as it uses browserSync
 * to load the files.
 *
 * @return {[type]} [description]
 */
gulp.task("run",function() {
  runSequence("default", "watch", function() {
    browserSync.init({
      // Default web root directory
      server: config.publicPath,
      // Open google chrome browser
      browser: "google chrome",
      // Port on which the application runs
      port: config.defaultPort
    });

    // Relad the browser when Javascript detects changes
    gulp.watch("build/js/*.js").on("change", browserSync.reload);
  });
});
