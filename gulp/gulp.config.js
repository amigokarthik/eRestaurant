"use strict";

/*
 * gulp.config.js
 * =============================================================================
 * This file is responsible for providing configurations to gulp process.
 *
 */
const config = {
  /* Port for starting the app on */
  defaultPort       : 9090,
  /* Public root files location */
  publicPath        : "build",
  tasksDir          : "./gulp/tasks/",
  bowerDir          : "./bower_components",
  nodeDir           : "./node_modules",
  sourceScriptsDir  : "./src/app",
  sourceStylesDir   : "./src/styles/scss",
  targetScriptsDir  : "./build/js/",
  targetStylesDir   : "./build/css/",
  targetFontsDir    : "./build/fonts/",
  targetImagesDir   : "./build/images/"
};

// Export the module
module.exports = config;
