const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload
const mulu = "learn4-test-order"
const dir = "./"+ mulu + "/"
// Static server
gulp.task('browser-sync', function() {
    var files = [
    dir + '**/*.html',
    dir + '**/*.css',
    dir + '**/*.js'
    ];
    browserSync.init(files,{
        // watchOptions: {
        //     ignoreInitial: true,
        //     ignored: '*.txt'
        // },
        server: {
            baseDir: "./" + mulu
        },
    });
    // browserSync.watch('./**/*.html').on('change',function(){
    //     console.log("hhhhh")
    // })
    gulp.watch('./**/*.html').on('change', function(){
        console.log("233")
        reload('./**/*.html')
    })
    gulp.watch('*.css').on('change', function(){
        consolel.log("ccbnnnccc")
    })
    console.log("重载？")
});
 
// Domain server
//gulp.task('browser-sync', function() {
//    browserSync.init({
//        proxy: "yourlocal.dev"
//    });
//});
gulp.task('default',gulp.series(['browser-sync'],function(){
    // gulp.watch(dir).on("change", reload)
    gulp.watch('*.html').on('change', reload);
    console.log("重载？")
})
); //定义默认任务

