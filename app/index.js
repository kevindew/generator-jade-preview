'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var JadePreviewGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Jade Preview Generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'libsass',
      message: 'Do you want libsass installed? choose this if you don\'t have SASS already installed, this tends to be a bit buggy compared to Ruby SASS but saves an install',
      default: false
    }, {
      type: 'confirm',
      name: 'coffee',
      message: 'Are you the sort of hipster that likes a bit of coffee script?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.coffee = props.coffee;
      this.libsass = props.libsass;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('app');

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
      this.src.copy('s3.json', 's3.json');
      this.src.copy('README.md', 'README.md');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('bowerrc', '.bowerrc');
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('gitattributes', '.gitattributes');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = JadePreviewGenerator;
