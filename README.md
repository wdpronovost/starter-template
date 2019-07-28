## Project Starter Template

### NPM GULP Packages

* [gulp](https://www.npmjs.com/package/gulp)
* [express](https://www.npmjs.com/package/express)
* [browser-sync](https://www.npmjs.com/package/browser-sync)
* [gulp-nodemon](https://www.npmjs.com/package/gulp-nodemon)
* [autoprefixer](https://www.npmjs.com/package/autoprefixer)
* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [gulp-clean](https://www.npmjs.com/package/gulp-clean)
* [gulp-concat](https://www.npmjs.com/package/gulp-concat)
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
* [gulp-postcss](https://www.npmjs.com/package/gulp-postcss)
* [gulp-purgecss](https://www.npmjs.com/package/gulp-purgecss)
* [cssnano](https://www.npmjs.com/package/cssnano)
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [node-sass](https://www.npmjs.com/package/gulp-sass)

***Note:*** For me the exciting part about this template is that it is setup for multiple development environments. (Or at least that is the goal.) The most difficult part of this whole thing was accounting for an Express environment. Found a great [resource](https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e) but it was [@DmitriouS](https://gist.github.com/Dmitri801) that had the code to get it working... mostly. The part I enjoyed most programming was the check for Express. In the Server Task section of the gulpfile, you will find a boolean ***isExpress*** if you change it to ***true*** then the ***browser-sync*** task will start ***nodemon*** for you, otherwise it won't. 

```javascript
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
```

PS - This is my first contribution!