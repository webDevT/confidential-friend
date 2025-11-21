let gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass'));
	browserSync = require('browser-sync').create(),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer');


gulp.task('clean', async function(){
	del.sync('docs')
})

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({outputStyle: 'expanded'})) 
		.pipe(autoprefixer({
			overrideBrowserslist:  ['last 8 versions']
		}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())
});


gulp.task('css', function(){
	
	return gulp.src('app/css/**/*.css')
		.pipe(browserSync.reload({stream: true}))
})

gulp.task('html', function(){
	return gulp.src('app/*.html')
	.pipe(browserSync.stream())

});

gulp.task('script', function(){
	return gulp.src('app/js/**/*.js')
	.pipe(browserSync.stream())

});



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('export', function(){
	let buildHtml = gulp.src('app/**/*.html')
		.pipe(gulp.dest('docs'));

	let BuildCss = gulp.src('app/css/**/*.css')
	.pipe(gulp.dest('docs/css'));

	let BuildJs = gulp.src('app/js/**/*.js')
	.pipe(gulp.dest('docs/js'));

	let BuildFonts = gulp.src('app/fonts/**/*.*')
	.pipe(gulp.dest('docs/fonts'));


	let BuildImg = gulp.src('app/assets/**/*.*')
	.pipe(gulp.dest('docs/assets'));
});

gulp.task('watch', function(){
	gulp.watch('app/sass/**/*.sass', gulp.series('sass'));
	gulp.watch('app/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('css', 'sass', 'browser-sync', 'watch'))