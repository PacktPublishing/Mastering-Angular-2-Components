# Mastering Angular 2 Components - Sample Application

This repository contains the source code of the task management application
built along with the book "Mastering Angular 2 Components". Each branch 
consists with the final code of each chapter and can be used to inspect
the final state as well as run the application.

## Pre-requisites

The sample application is built using Node.js technologies and therefore
requires you to have Node.js installed on your machine before you can 
run any of the code.

You can download and install Node.js on the website http://nodejs.org.

In order to build the Sass source files and start a server with live-reload
two global node modules are required.

```
npm install -g gulp live-server
```

## Usage

Before you can use the current chapters code, you'll need to install any
NPM as well as JSPM dependencies. By running the following two lines of 
code on your console, you'll make sure all dependencies are installed.

```
npm install
jspm install
```

After you've installed the required dependencies, you can go ahead and
start the application:

```
npm start
```

The NPM start script will invoke gulp in order to compile any Sass files
as well as live-server to start a static server with live-reload. Please
read the pre-requisites on how to install those global Node.js modules.

## Cleaning IndexDB to Reset Data

If you'd like to clean the local database in your browser used within the
sample application, you can run the following line of code within your
browsers console. It's important that you're running the code snippet 
in the debugger of your browser with the sample application open. If your
browser is pointing to a different origin, the sample application database
can't be deleted. After deleting the database, the sample application can
be reloaded, and it will re-create the database with the initial sample
data.

```
indexedDB.deleteDatabase('_pouch_angular-2-components');
```
