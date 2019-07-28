// Main Gulp
const gulp = require("gulp");

// CSS Stuff
const scss = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const purgecss = require("gulp-purgecss");
const postcss = require("gulp-postcss");

scss.compiler = require("node-sass");

// Image Stuff
const imagemin = require("gulp-imagemin");

// Misc
const clean = require("gulp-clean");

// JS Stuff
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

// Server Stuff
const browserSync = require("browser-sync").create();
const nodemon = require("gulp-nodemon");

// Main Paths
const paths = {
	styles: {
		src: "src/scss/*.scss",
		dest: "dist/css/"
	},
	html: {
		src: "src/*.html",
		dest: "dist/"
	},
	assets: {
		src: "src/assets/**/*.+(png|jpg|gif|svg)",
		dest: "dist/assets/"
	},
	scripts: {
		src: "src/scripts/**/*.js",
		dest: "dist/scripts/"
	},
	views: {
		src: "src/views/**/*.ejs",
		dest: "dist/views/**/"
	}
};

// Tasks

// Clean Task
// Removes items from 'dist' folders to ensure complete rebuild of project files.
// Note: This is run everytime via default task

gulp.task("clean-dist", function() {
	return gulp.src("dist/*").pipe(clean());
});

// Server Tasks
// Must be aware of whether or not we are using Express and Nodemon

const isExpress = false; // Set to true if using Express

gulp.task("nodemon", cb => {
	let started = false;

	return nodemon({
		script: "src/app.js"
	}).on("start", () => {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task("browser-sync", function() {
	if (isExpress) {
		gulp.series("nodemon", () => {
			browserSync.init(null, {
				proxy: "http://localhost:3000",
				files: ["dist/**/*.*"],

				port: 3001
			});
		});
	} else {
		browserSync.init({
			server: {
				baseDir: "dist/"
			}
		});
	}
});

function reload(done) {
	browserSync.reload();
	done();
}

// HTML Task
// Moving files from src to dist
gulp.task("html", function() {
	return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest));
});

// Views ejs Task
gulp.task("ejs", function() {
  return gulp
    .src(paths.views.src)
    .pipe(gulp.dest(paths.views.dest));
});

// SCSS / CSS Tasks
gulp.task("styles", function() {
	return gulp
		.src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(
			scss({
				errorLogToConsole: true
			})
		)
		.on("error", scss.logError)
		.pipe(
			purgecss({
				content: [paths.html.src]
			})
		)
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(paths.styles.dest));
});

// Image Tasks
gulp.task("images", function() {
	return gulp
		.src(paths.assets.src)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.assets.dest));
});

// Scripts Tasks
gulp.task("scripts", function() {
	return gulp
		.src(paths.scripts.src)
		.pipe(concat("scripts.js"))
		.pipe(uglify())
		.pipe(gulp.dest(paths.scripts.dest));
});

// Watch Tasks
gulp.task("watch", function() {
	gulp.watch(paths.html.src, gulp.series(["html", reload]));
	gulp.watch(paths.styles.src, gulp.series(["styles", reload]));
	gulp.watch(paths.assets.src, gulp.series(["images", reload]));
	gulp.watch(paths.scripts.src, gulp.series(["scripts", reload]));
});

// Build and Default Tasks
gulp.task(
	"build",
	gulp.series(["clean-dist", "html", 'ejs', "styles", "images", "scripts"])
);
gulp.task("default", gulp.parallel(["build", "browser-sync", "watch"]));
