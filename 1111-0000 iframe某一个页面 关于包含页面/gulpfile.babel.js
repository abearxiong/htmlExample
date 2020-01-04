// Skip to content
// Gulp 4 + Browsersync
//  gulpfile.babel.js
import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
// import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import browserSync from 'browser-sync';
import del from 'del';
import inject from 'gulp-inject'

const server = browserSync.create();

const paths = {
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/scripts/'
  },
  lib: {
    src: 'src/lib/**/*.js',
    dest: 'lib/'
  },
  styles: {
    src: 'src/styles/**/*.css',
    dest: 'dist/styles/'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  components: {
    src: 'src/components/**/*.html',
    dest: 'dist/components/'
  },
  images: {
    // src: 'src/images/**/*.{jpg, jpeg, png, svg, webp}',
    src: 'src/images/**/*',
    dest: 'dist/images/'
  }
};


/**********    Build tasks    **********/

// Delete dist folder
export const clean = () => del(['dist','lib']);

// Process and uglify js, copy to dist folder
export function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}
export function lib() {
  return gulp.src(paths.lib.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('index.js'))
    .pipe(gulp.dest(paths.lib.dest));
}

// Process and minify css, copy to dist folder
export function styles() {
  return gulp.src(paths.styles.src,{ sourcemaps: true })
    .pipe(less())
    .pipe(cleanCSS())
    // pass in options to the stream
    // .pipe(rename({
    //   basename: 'main',
    //   suffix: '.min'
    // }))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(paths.styles.dest));
}

// Copy html to dist folder
export function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
}

// Copy html to dist folder
export function components() {
  return gulp.src(paths.components.src)
    .pipe(gulp.dest(paths.components.dest));
}


/**********    Image Handling    **********/

// Minify images and copy to build folder
export function images() {
  // return gulp.src(paths.images.src, { since: gulp.lastRun(images)})
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}

/**********    Inject    **********/
// inject css to folder
export function injectCSS(){
  return gulp.src(paths.html.src)
    .pipe(inject(
      gulp.src(['src/styles/**/*.css'])
      ))
    .pipe(gulp.dest(paths.html.dest))
}
export function injectJS(){
  return gulp.src(paths.html.src)
    .pipe(inject(
      gulp.src(['src/scripts/**/*.js'])
      ))
    .pipe(gulp.dest(paths.html.dest))
}
export function injectCJ(){
  return gulp.src(paths.html.src)
  .pipe(inject(
    gulp.src(['src/styles/**/*.css','src/scripts/**/*.js'], {read: false})
    ))
  .pipe(gulp.dest(paths.html.dest))
}

/**********    Development    **********/

// Start serving src folder
export function serve(done) {
  server.init({
    server: {
      // baseDir: './src'
      baseDir: './dist'
    },
    port: 5000
  });
  done();
}

// Reload the server
export function reload(done) {
  server.reload('index.html');
  done();
}

// Watch files for changes and reload server
export function watch() {
  gulp.watch(paths.scripts.src, gulp.series(scripts));
  gulp.watch(paths.lib.src, gulp.series(lib));
  gulp.watch(paths.styles.src, gulp.series(styles));
  gulp.watch(paths.html.src, gulp.series(html));
  gulp.watch(paths.components.src, gulp.series(components));
  gulp.watch(paths.images.src, gulp.series(images));
}

// Build dist folder, start server, and watch files
// const build = gulp.series(clean, gulp.parallel(scripts, styles, html, images),injectCSS,injectJS, serve, watch);
const build = gulp.series(clean, gulp.parallel(scripts,lib, styles, html,components, images), serve, watch);

// Set build as default task
export default build;
