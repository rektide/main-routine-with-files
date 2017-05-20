#!/usr/bin/env node
"use strict"

process.on("unhandledRejection", console.error)

var mrwf= require( "..")

async function main(){
	return mrwf({
		runFile: filename=> console.log("file:", filename),
		defaultGlob: "*"
	})
}

module.exports= main

if( require.main=== module){
	main()
}
