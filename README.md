# aventadorjs

[![Build Status](https://travis-ci.org/karlpatrickespiritu/aventadorjs.svg?branch=master)](https://travis-ci.org/karlpatrickespiritu/aventadorjs)

A JavaScript application modules organizer. [http://karlpatrickespiritu.github.io/aventadorjs/](http://karlpatrickespiritu.github.io/aventadorjs/)

Version
--------
[0.0.2](https://github.com/karlpatrickespiritu/aventadorjs/releases)

Installation
--------
via [npm](https://www.npmjs.com/)
```sh
$ npm install aventadorjs
```

via [bower](bower.io)
```sh
$ bower install args-checker-js
```

Documentation
--------

For a detailed information about aventadorjs, please visit our [docs site](http://karlpatrickespiritu.github.io/aventadorjs/).

Also, you might want to see aventadorjs in action in [this sample app](http://karlpatrickespiritu.github.io/aventadorjs/sample-app/).

Quick Usage
--------

```JavaScript
var aventador = require('./bower_components/aventadorjs/dist/aventador.js');

myApp = aventador.module('myApp')

myApp
    .utility('StringUtility', function() {
        return {
            isString: isString
        }

        function isString(str) {
            return typeof str === 'string';
        }
    })
    .factory('UsersFactory', function(StringUtility) {
        return {
            create: create
        }

        function create(user) {
            // some user creation here..
            if (StringUtility.isString(user.name)) {
                return true;
            }

            return false;
        }
    })
    .service('UsersService', function(UsersFactory) {
        return {
            isLoggedIn: isLoggedIn,
            register: register
        }

        function isLoggedIn() {
            // some ajax request here..
            return false;
        }

        function register(user) {
            var user = UsersFactory.create(user);
            // some ajax request here..
            return user;
        }
    })
    .handler('UsersHandler', function (UsersService) {
        return {
            register: register
        }

        function register(user) {
            if (!UsersService.isLoggedIn()) {
                return UsersService.register(user)
            }

            return false;
        }
    })

console.log(myApp.getHandler('UsersHandler').register({ name: 'john'}));
```

Maintainers
--------
 - [@karlpatrickespiritu](https://github.com/karlpatrickespiritu)
 - and [contributors](https://github.com/karlpatrickespiritu/aventadorjs/graphs/contributors)
 
License
--------
(C) [Karl Patrick Espiritu](https://github.com/karlpatrickespiritu/) 2015, released under the MIT license
