# Starter Template

##<a name="Step1"></a> Step 1 - Make Directory

Whatever way you prefer, make a new project directory and move into that directory.

```bash
   $ mkdir mydirectory
   $ cd mydirectory
```

## Step 2 - Verify NODE

Ensure Node.JS is installed

```bash
   $ node --version
```
NPM (Node Packet Manager) comes with Node.JS so it should be installed, but check anyway.

```bash
   $ npm --version
```

If you need to install Node.js visit [NodeJS.org](www.nodejs.org) and download for your system and install. 

## Step 3 - Initialize NPM

From your working directory [Step 1](#Step1)

```bash
   $ npm init
```
You will be prompted for some answers to project details, enter response or just hit enter to accept the defaults. This process creates the ***package.json*** file.

## Step 4 - Install Packages

From the command line, you will now be able to install node modules for your project. Some of these might need the global flag *"-g"*, some might need to be install with a dependency flag *"--save-dev"*, and some won't need any special flag. 

***Ensure you follow the module's guide.***

### Gulp

GulpJS is an automation tool. It helps get things up and running allowing you to focus more on the development work. 

```bash
   $ npm install --save-dev gulp
```
Create a ***gulpfile***. This is where you will create you task automation.

```bash
   $ touch gulpfile.js
```
npm install node-sass gulp-sass --save-dev

var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');

## Step 5 -

