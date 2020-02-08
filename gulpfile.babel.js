const gulp = require("gulp");
const suite = require('@cloudcannon/suite');
const { scripts } = require('./tasks/webpack');
suite.dev(gulp)

exports.scripts = scripts;
