"use strict"

var
  es6promisify= require( "es6-promisify"),
  Glob= es6promisify( require( "glob")),
  pmap= require( "p-map")

async function glob( globs){
	if( !globs){
		return
	}
	if( globs.prototype=== String){
		globs=[ globs]
	}
	var files= await pmap( globs, g=> Glob( g))
	files= Array.prototype.concat.apply([], files)
	return files
}

module.exports= glob
