# FSWire Web/Mobile Client

Base Framework Client for fswire using angularjs and fswire server api.

This is intended to be a fully disconnected client that will leverage the full fswire.com api.  We are using the angular framework developed by Google with a view to providing a platform agnostic solution.

## Setup

### Windows Pre-requisits

 For windows installation, the following should be followed before yeoman installation begins:
    http://decodize.com/css/installing-yeoman-front-end-development-stack-windows/
    http://chocolatey.org/packages/chocolatey/0.9.8.20

#### Troubleshooting

On some windows installtions npm was not installing the live-reloaded so in these cases run the following:

        npm install --save-dev grunt-contrib-livereload

### 1. Install Yeoman

    npm install -g yo grunt-cli bower
    npm install -g generator-webapp
    npm install -g generator-angular

Workflow is comprised of three tools for improving your productivity and satisfaction when building a web app: yo (the scaffolding tool), grunt (the build tool) and bower (for package management).
 * Yo scaffolds out a new application, writing your Grunt configuration and pulling in relevant Grunt tasks that you might need for your build.
 * Grunt is used to build, preview and test your project, thanks to help from tasks curated by the Yeoman team and grunt-contrib.
 * Bower is used for dependency management, so that you no longer have to manually download and manage your scripts.

See [Yeeoman](http://yeoman.io/gettingstarted.html) for more information

### 2. Install Ruby/Compass

    gem install compass

Note. this project includes .rvmrc file which will set the default ruby version and gemset if rvm is installed

### 3. Run development environment

    grunt server


## Yo

Creating controllers/services etc

    Usage: yo GENERATOR [args] [options]

      Angular
        angular:app
        angular:common
        angular:controller
        angular:directive
        angular:filter
        angular:main
        angular:route
        angular:service
        angular:view

### Examples

To generate a new service

    yo angular:service myService

  1. creates a new file in app/scripts/services/myService.js
  2. includes the script in app/index.html


Copyrite &copy; fswire.com, fswire Ltd, all rights reserved