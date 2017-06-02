//本篇示例开发/生产环境gulp自动化构建配置
//主要解决如下几个问题
//1.js自动检查压缩合并
//2.css自动添加浏览器私有前缀、压缩、合并
//3.html引用文件版本号自动更新
//4.监视文件更新自动刷新浏览器

//依赖列表及用途
/*异常处理*/
// gulp-notify
// gulp-plumber
/*添加私有前缀*/
// gulp-autoprefixer
// gulp-postcss
// gulp-sourcemaps
/*推荐在package.json中配置browserlist*/

var gulp = require('gulp'),
	//autoprefixer和precss不能通过gulp-load-plugins导入。导入会出bug
	//gulp-autoprefixer不能配合postcss工作，postcss需要的是autoprefixer
	//gulp-load-plugins只能加载gulp-开头插件，加载precss并不能通过plugins.precss获取到。
	autoprefixer=require('autoprefixer'),
	precss=require('precss'),
	plugins=require('gulp-load-plugins')();

/*css*/
gulp.task('build-css',function(){
	gulp.src('./src/css/postcss.css')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.plumber({errorHandler: plugins.notify.onError('Error: <%= error.message %>')}))
		// .pipe(plugins.postcss([plugins.precss,plugins.autoprefixer]))
		.pipe(plugins.postcss([precss,autoprefixer({//precss后面括号可要可不要，为了直观当postcss配置插件内容较多时建议单独声明个变量配置
		// .pipe(plugins.postcss([precss(),autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        })]))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/css'));
});
