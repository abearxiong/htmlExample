# htmlExample

不喜欢网上的编辑器，比如codepen，codebox,jsfiddle等等都感觉卡，不是国内服务器的原因吧。国内没有比较好的。

所以就本地开发吧，有一些自己要自己尝试编写的网页的例子。

## 00000000-00000099 为一些默认的配置

比如jquery,Bootstrap的一些简单的列表例子的显示。

## 00000100 开头为图片为主

奇奇怪怪的图片咯

## gulp的配置问题

之前使用browsesync是放在开发文档进行查看的，然而突然觉得应该放在dist的index看，因为所有的内容处理是在dist，查看的内容就具体的位置是哪里，而开发目录下的东西很乱杂。不然就要一一对应，那样是很麻烦的。

运行方式 在具有`gulpfile.babel.js`的目录下运行`gulp`

```javascript
// Skip to content
// Gulp 4 + Browsersync
//  gulpfile.babel.js
import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
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
  styles: {
    src: 'src/styles/**/*.css',
    dest: 'dist/styles/'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  images: {
    src: 'src/images/**/*.{jpg, jpeg, png, svg}',
    dest: 'build/images/'
  }
};


/**********    Build tasks    **********/

// Delete dist folder
export const clean = () => del(['dist']);

// Process and uglify js, copy to dist folder
export function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Process and minify css, copy to dist folder
export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

// Copy html to dist folder
export function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
}


/**********    Image Handling    **********/

// Minify images and copy to build folder
export function images() {
  return gulp.src(paths.images.src, { since: gulp.lastRun(images)})
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
  return gulp.src('index.html')
    .pipe(inject(
      gulp.src(['src/scripts/**/*.js'])
      ))
    .pipe(gulp.dest(paths.scripts.dest))
}


/**********    Development    **********/

// Start serving src folder
export function serve(done) {
  server.init({
    server: {
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
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
  gulp.watch(paths.styles.src, gulp.series(styles, reload));
  gulp.watch(paths.html.src, gulp.series(html, reload));
}

// Build dist folder, start server, and watch files
const build = gulp.series(clean, gulp.parallel(scripts, styles, html, images),injectCSS, serve, watch);

// Set build as default task
export default build;

```


## 本地开发问题

之前使用`npm i -g serve` 来做查看服务，但是serve功能不全面，因此使用`live server`代替