#!/usr/bin/env node
"use strict"

var
  es6promisify= require( "es6-promisify"),
  fs= require( "fs"),
  path= require( "path"),
  readdir= es6promisify( fs.readdir)

async function main(){
	var children= await readdir( __dirname)
	for( var i= 0; i< children.length; ++i){
		var
		  child= children[ i],
		  file= __dirname+ path.sep+ child
		if( child== "index.js"){
			continue
		}
		console.log( "running:", child)
		await require( file)()
		console.log()
	}
}

module.exports= main

if( require.main=== module){
	module.exports()
}
