# aventadorjs

[![Build Status](https://travis-ci.org/karlpatrickespiritu/aventadorjs.svg?branch=master)](https://travis-ci.org/karlpatrickespiritu/aventadorjs)

A JavaScript application modules organizer.

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

Sample Application
--------

See aventadorjs in action in [this sample app](http://karlpatrickespiritu.github.io/aventadorjs/sample-app/).

APIAPI
--------

#### .module(moduleName)
creates a module.

Parameters
 - moduleName (*string*) - the name of the module.

```JavaScript
	var registration = aventador.module('registration');
```

#### .controller(controllerName, controllerFunction)
create a controller object

Parameters
 - controllerName (*string*) - the name of the controller.
 - controllerFunction (*function*) - a module function that returns an object.

```JavaScript
aventador
	.module('myApp')
	.controller('RegistrationController', function() {
		return {
			someFunction: someFunction
		}

		function someFunction() {
			// some logic here
			return { foo: 'bar' }
		}
	});
```

.....

Quick Usage
--------
**NOTE:** dummy data were used just to show an example.


include aventador in your app.
```html
<script src="aventadorjs/dist/aventador.min.js"></script>
```

app.js
```JavaScript
(function(window, aventador) {
    "use strict";

    var myApp = aventador.module('myApp');

    myApp
        .utility('StringUtility', function() {
            return {
                isString: isString
            }

            function isString(str) {
                return typeof str === 'string';
            }
        })
        .factory('UsersFactory', function(StringUtility) { // Dependency Injection
            return {
                create: create
            }

            function create(user) {
                // some user creation here..
                if (StringUtility.isString(user.name)) {
                    return { id: 123, name: user.name};
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

            function register(user, callback) {
                if (!UsersService.isLoggedIn()) {
                    var user = UsersService.register(user);

                    if (callback) { callback(user) }

                    return user;
                }

                return false;
            }
        })

})(window, aventador);
```

Using with jQuery event handlers.
```JavaScript
(function(window, $, aventador) {
    "use strict";
    
    // document ready
    $(function() {
        var myApp = aventador.module('myApp'), // your app module
            UsersHandler = myApp.getHandler('UsersHandler'); // your handler object
    
        $('form').on('submit', function(e) {
            var $this = $(this),
                data = $this.serialize();
    
            UsersHandler.register(data, function(user) {
                console.log(user); // Object {id: 123, name: "john"}
            })
    
            e.preventDefault();
        })
    })
    
})(window, jQuery, aventador);
```

Maintainers
--------
 - [@karlpatrickespiritu](https://github.com/karlpatrickespiritu)
 - and [contributors](https://github.com/karlpatrickespiritu/aventadorjs/graphs/contributors)
 
License
--------
(C) [Karl Patrick Espiritu](https://github.com/karlpatrickespiritu/) 2015, released under the MIT license
