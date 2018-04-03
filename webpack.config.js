//Load Dependencies ==========================
const webpack = require('webpack');
const glob = require('glob');
const path = require('path');

const views = glob.sync('./static/src/js/views/**/*.js');


//Setting Internals ==========================
const internals = {
	static: `${ __dirname }/static`
};
internals.src = `${ internals.static }/src`;

//Main Config ================================
const config = {
	entry: {
		main : [`${ internals.src }/js/main.js`]
	},
	output: {
		filename: '[name].js',
	    path: path.resolve(`${__dirname}/static/`, 'js')
	    //publicPath:  path.resolve(`${__dirname}/static/`, 'js')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					'babel-loader'
				]
			}
		]
	}
};

if (views.length) {
  for (var i = 0; i < views.length; i++) {
    config.entry[views[i].replace('./static/src/js/','./').replace('.js','')] = views[i];
  }
};

// Exposing `config` for webpack ================
module.exports = config;
