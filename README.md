# aventadorjs

[![Build Status](https://travis-ci.org/karlpatrickespiritu/aventadorjs.svg?branch=master)](https://travis-ci.org/karlpatrickespiritu/aventadorjs) [![npm version](https://badge.fury.io/js/aventadorjs.svg)](https://badge.fury.io/js/aventadorjs) [![Downloads](http://img.shields.io/npm/dm/aventadorjs.svg)](https://www.npmjs.com/package/aventadorjs)


####javascript module organizer.

Aventadorjs let's you organize your javascript code into different layers to enable decoupling.

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

API
--------

#### .module(moduleName)
> A module will serve as a container of the different parts of your app.
>
> Parameters:
> 
> - moduleName (*string*) - the name of the module.

```JavaScript
var myApp = aventador.module('myApp');
```

**NOTE:**
The following methods will only be accessible after calling the `module` method.

#### .utility(utilityName, utilityFunction)
> Creates a utility object. Think of utilities as somewhat like helpers.
>
> Parameters:
>
> - utilityName (*string*) - utility name.
> - utilityFunction (*function*) - a function that returns a utility object.

```JavaScript
myApp.utility('StringUtility', function() {
    return {
        upperCaseWords: upperCaseWords
    }

    function upperCaseWords(string) {
        var words = string.split(' ')

        for (var i = 0; i <= (words.length - 1); i++)
            words[i] = words[i].charAt(0).toUpperCase() + string.slice(1)

        return words.join(' ')
    }
});
```

#### .service(serviceName, serviceFunction)
> Creates a service object. A service object may contain functions that involves fetching data from a server or the like.
>
> Parameters:
> 
> - serviceName (*string*) - service name.
> - serviceFunction (*function*) - a function that returns a service object.

```JavaScript
myApp.service('UsersService', function() {
    return {
        register: register
    }

    // sample service using jQuery's $.post method
    function register(data, callback) {
        $.post('/some/api/request/path', data).done(callback || false);
    }
});
```

#### .factory(factoryName, factoryFunction)
> Creates a factory object. A is a creational pattern concerned with the notion of creating objects. See [Factory Pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript).
>
> Parameters:
> 
> - factoryName (*string*) - factory name.
> - factoryFunction (*function*) - a function that returns a factory object.

```JavaScript
myApp.factory('UsersFactory', function() {
    return {
        create: create
    }

    function create(params) {
        // some factory creation going on here..
        return {
            getName: function () {
                return 'someName';
            }
        }
    }
});
```

#### .controller(controllerName, controllerFunction)
> Creates a controller object. A controller object may implement logic of a particular module.
>
> Parameters:
> 
> - controllerName (*string*) - controller name.
> - controllerFunction (*function*) - a function that returns a controller object.

```JavaScript
myApp.controller('RegistrationController', function(UsersService) { // dependency injection
    // `UsersService` is now available for use
    
    return {
        register: register
    }

    function register(data) {
        // some badass logic here...
        return UsersService.register(data, function(response) {
			console.log(response)
		})
    }
});
```

#### .getController(controllerName)
> Returns the controller object that was defined.
>
> Parameters:
> 
> - controllerName (*string*) - factory name.

```JavaScript
var RegistrationController = myApp.getController('RegistrationController');
```

#### .getService(serviceName)
> Returns the service object that was defined.
>
> Parameters:
> 
> - serviceName (*string*) - service name.

```JavaScript
var UsersService = myApp.getService('UsersService');
```

#### .getUtility(utilityName)
> Returns the utility object that was defined.
>
> Parameters:
> 
> - utilityName (*string*) - utility name.

```JavaScript
var StringUtility = myApp.getUtility('StringUtility');
```

#### .getFactory(factoryName)
> Returns the factory object that was defined.
>
> Parameters:
> 
> - factoryName (*string*) - factory name.

```JavaScript
var UsersFactory = myApp.getFactory('UsersFactory');
```

### Dependency Injection
[Dependency Injection](http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript) is supported in aventador js.

Let's dive in directy on how to inject dependencies in components
```JavaScript

aventador
	.module('myApp')
	.service('UsersService', function() {
		return {
	        register: register
	    }
	
	    // sample service using jQuery's $.post method
	    function register(data, callback) {
	        $.post('/some/api/request/path', data).done(callback || false);
	    }
	})
	.controller('RegistrationController', function(UsersService) { // Dependecy Injection
	    // `UsersService` is now available for use
		
	    return {
	        register: register
	    }
	
	    function register(data) {
	        // some badass logic here
	        return UsersService.register(data, function(response) {
				console.log(response)
			})
	    }
	});
```


Quick Usage
--------

> See aventadorjs in action in [this sample app](http://karlpatrickespiritu.github.io/aventadorjs/sample-app/).

**NOTE:** 
It's much better to create a separate file for every component.

load aventador.js
```html
<script src="aventadorjs/dist/aventador.min.js"></script>
```

application.js
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

Implementation using jQuery.
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
