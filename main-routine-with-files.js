"use strict"

var
  glob= require( "./glob"),
  pmap= require( "p-map")

async function main( opts){
	opts= opts|| {}
	if( !opts){
		opts= {
			args: process.args,
			env: process.env
		}
	}
	if( opts.args&& opts.minimist=== undefined){
		if( opts.args._){
			opts.minimist= minimist( opts.args)
		}
	}
	if( !opts.globs&& opts.minimist){
		opts.globs= opts.minimist._
	}
	if( !opts.globs&& opts.defaultGlob){
		opts.globs= opts.defaultGlob
	}
	if( !opts.files&& opts.globs){
		opts.files= await glob( opts.globs)
	}
	if( opts.fileCheck){
		opts.fileCheck( opts.files)
	}

	var output
	if( opts.runFile){
		var concurrency= opts.concurrency=== undefined? 5: opts.concurrency
		output= await pmap( opts.files, opts.runFile,{ concurrency})
	}else{
		output= opts.files
	}
	output.opts= opts
	return output
}

module.exports= main
