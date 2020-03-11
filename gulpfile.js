var gulp = require("gulp"),
	sass = require("gulp-sass"),
	browserSync = require("browser-sync"),
	plumber = require("gulp-plumber"),
	rename = require("gulp-rename");
	autoprefixer = require("gulp-autoprefixer");
	imagemin = require('gulp-imagemin');
	uglify = require('gulp-uglify');
	pipeline = require('readable-stream').pipeline;
	cleanCSS = require('gulp-clean-css');
 
	gulp.task('uglify', function () {
  return pipeline(
    gulp.src('src/script/*.js'),
    uglify(),
    gulp.dest('dist/src/script')
  	);
	});

	gulp.task('minify-css', () => {
		return gulp.src('src/css/*.css')
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest('dist/src/css'));
	});


gulp.task("sass", function() {
  gulp
    .src("src/sass/main.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(rename("style.css"))
    .pipe(
      autoprefixer({
        browsers: ["last 20 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", ["sass", "browser"], function() {
	gulp.watch("src/sass/**/*.scss", ["sass"]);
	gulp.watch("src/index.html", browserSync.reload);
});

gulp.task("browser", function() {
	browserSync({
		server: { baseDir: "src" },
		notify: false
	});
});

gulp.task("build", function() {
	gulp.src(["src/css/*.css"]).pipe(gulp.dest("dist/src/css"));
	gulp.src(["src/bootstrap/css/*.css"]).pipe(gulp.dest("dist/src/bootstrap/css"));
	gulp.src(["src/bootstrap/jquery/*.js"]).pipe(gulp.dest("dist/src/bootstrap/jquery"));
	gulp.src(["src/bootstrap/js/*.js"]).pipe(gulp.dest("dist/src/bootstrap/js"));
	gulp.src(["src/script/*.*"]).pipe(gulp.dest("dist/src/script"));
	gulp.src(["src/css/*.*"]).pipe(gulp.dest("dist/src/css"));
	gulp.src(["src/fonts/*.*"]).pipe(gulp.dest("dist/src/fonts"));
	gulp.src(["src/icons/*.*"]).pipe(gulp.dest("dist/src/icons"));
	gulp.src(["src/icons/social/*.*"]).pipe(gulp.dest("dist/src/icons/social"));
	gulp.src(["src/img/*.*"]).pipe(gulp.dest("dist/src/img"));
	gulp.src("*.html").pipe(gulp.dest("dist"));
});

gulp.task('compress', function() {
  gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/src/img'))
});