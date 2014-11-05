/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var _ = require('underscore');

describe('jade-preview:app', function () {
  var options = {
    'skip-install-message': true,
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  var runGen;

  beforeEach(function () {
    runGen = helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withGenerators([[helpers.createDummyGenerator(), 'mocha:app']]);
  });

  var expected = [
    'bower.json',
    'package.json',
    '.bowerrc',
    '.editorconfig',
    '.gitattributes',
    '.gitignore',
    'Gruntfile.js',
    '.jshintrc',
    'README.md',
    's3.json'
  ];

  it('creates files', function (done) {
    runGen.withOptions(options).on('end', function () {
      assert.file(expected);

      done();
    });
  });


  it('creates expected CoffeeScript files', function (done) {
    runGen.withOptions(options).withPrompt({ coffee: true })
    .on('end', function () {

      assert.file([].concat(
        expected,
        'app/scripts/main.coffee'
      ));
      assert.noFile('app/scripts/main.js');

      assert.fileContent([
        ['Gruntfile.js', /coffee/]
      ]);

      done();
    });
  });

  it('creates expected ruby SASS components', function (done) {
    runGen.withOptions(options).withPrompt({ libsass: false })
    .on('end', function () {

      assert.fileContent([
        ['Gruntfile.js', /sass/],
        ['package.json', /grunt-contrib-sass/]
      ]);

      assert.noFileContent([
        ['package.json', /grunt-sass/]
      ]);

      done();
    });
  });

  it('creates expected node SASS files', function (done) {
    runGen.withOptions(options).withPrompt({ libsass: true })
    .on('end', function () {

      assert.fileContent([
        ['package.json', /grunt-sass/]
      ]);

      assert.noFileContent([
        ['package.json', /grunt-contrib-sass/]
      ]);

      done();
    });
  });
});
