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

    if (!this.options['skip-welcome-message']) {
      this.log(yosay(
        'Welcome to the Jade Preview Generator!'
      ));
    }

    var prompts = [{
      type: 'value',
      name: 'projectName',
      message: 'What would you name this project?',
      default: 'My Project'
    },{
      type: 'confirm',
      name: 'libsass',
      message: 'Do you want libsass installed? choose this if you don\'t have SASS already installed, this tends to be a bit buggy compared to Ruby SASS but saves an install',
      default: false
    }, {
      type: 'confirm',
      name: 'coffee',
      message: 'Are you the sort of hipster that likes a bit of coffee script?',
      default: false
    }, {
      type: 'confirm',
      name: 'ftpDeploy',
      message: 'Do you want the bits so you can deploy this via ftp?',
      default: false
    },  {
      type: 'confirm',
      name: 's3Deploy',
      message: 'Do you want the bits so you can deploy this via s3?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.coffee = props.coffee;
      this.libsass = props.libsass;
      this.ftpDeploy = props.ftpDeploy;
      this.s3Deploy = props.s3Deploy;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('app');
      this.template('_layout.jade', 'app/_layout.jade');
      this.template('index.jade', 'app/index.jade');
      this.dest.mkdir('app/images');
      this.write('app/images/.gitkeep', '');
      this.dest.mkdir('app/scripts');
      if (this.coffee) {
        this.src.copy('main.coffee', 'app/scripts/main.coffee');
      } else {
        this.src.copy('main.js', 'app/scripts/main.js');
      }
      this.dest.mkdir('app/styles');
      this.src.copy('main.scss', 'app/styles/main.scss');
      this.dest.mkdir('app/styles/fonts');
      this.write('app/styles/fonts/.gitkeep', '');
    },

    projectfiles: function () {
      this.template('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
      if (this.ftpDeploy) {
        this.write('.ftp.json', JSON.stringify({
          preview: {
            username: 'username',
            password: 'password'
          },
          dist: {
            username: 'username',
            password: 'password'
          }
        }, null, 2));
      }
      if (this.s3Deploy) {
        this.write('.aws.json', JSON.stringify({
          AWSAccessKeyId: "Your Access Key",
          AWSSecretKey: "Your Secret Key"
        }, null, 2));
      }
      this.template('README.md', 'README.md');
      this.template('Gruntfile.js', 'Gruntfile.js');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('bowerrc', '.bowerrc');
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('gitattributes', '.gitattributes');
    }
  },

  end: function () {
    if (!this.options['skip-install']) {
      this.installDependencies({
        skipMessage: this.options['skip-install-message'],
        skipInstall: this.options['skip-install']
      });
    }
  }
});

module.exports = JadePreviewGenerator;
