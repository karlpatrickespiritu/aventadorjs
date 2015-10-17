(function (window, undefined) {
    "use strict";

    /**
     * Simple JS helper functions.
     */
    var helpers = {
        data: {
            isString: function(data) {
                return typeof data === 'string';
            },
            isUndefined: function(data) {
                return typeof data === 'undefined';
            },
            isFunction: function(data) {
                return typeof data === 'function';
            },
            isArray: function(data) {
                return data.constructor === Array;
            }
        },
        array: {
            exists: function (array, data) {
                return array.indexOf(data) !== -1;
            },
            keyExists: function (key, array) {
                return !helpers.data.isUndefined(array[key]);
            },
            getIndex: function(array, property) {
                return array.indexOf(property);
            }
        },
        string: {
            capitalizeFirstLetter: function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        }
    };

    /**
     * Exception object for aventador
     */
    var aventadorException = (function () {
        return {
            notify: notify
        }

        function notify(message) {
            throw "Aventador Exception: " + message;
        }
    })();

    /**
     * Parameter checker
     */
    var args = (function () {

        function expect(args, expectations, callback) {

            // TODO:: check if args is instance of arguments object?

            if (arguments.length < 1 || !(expectations.constructor === Array)) {
                _throwArgumentDataTypeException(2, 'array');
            }

            // TODO:: check if valid strings on expectations

            if (expectations.length) {
                for (var i = 0; i <= (expectations.length -1); i++) {
                    var argType = typeof args[i],
                        argExpectations = expectations[i].split('|');

                    console.log(argExpectations);

                    if ((argType === 'undefined') || (argType !== expectations[i])) {}

                    //if ((typeof args[i] === 'undefined') || (typeof args[i] !== expectations[i])) {
                    //    _throwArgumentDataTypeException((i+1), expectations[i]);
                    //}
                }
            } else {
                //
            }
        }

        /**
         * Checks if string passed is a valid javascript data type.
         * @param {string}
         * @returns {boolean}
         */
        function validDataType(dataType) {
            return ['object', 'function', 'string', 'number', 'boolean'].indexOf(dataType) !== -1;
        }

        /**
         * Throws an argument exception if the function had an invalid argument data type
         * @param {integer}
         * @param {string}
         * @private
         */
        function _throwArgumentDataTypeException(argumentIndex, mustbe) {
            var an = ['object'],
                a = ['function', 'string', 'number', 'boolean'],
                article = '';

            if (!validDataType(mustbe)) {
                throw new ArgumentException("Argument number " + argumentIndex + " is not a valid type. only ");
            }

            article = (a.indexOf(mustbe) !== -1) ? 'a': 'an';

            throw new ArgumentException("Argument number " + argumentIndex + " must be " + article + " " + mustbe);
        }

        /**
         * ArgumentException object
         * @param {string}
         */
        function ArgumentException(message) {
            this.message = message;
            this.name = "ArgumentException";
            this.toString = function() {
                return this.name + ": " + this.message;
            };
        }

        return {
            expect: expect
        }

    })();

    window.aventador = (function (helpers, exception, args) {

        // the single object the will be used throughout the framework
        var _app = {
            name: undefined,
            modules: {
                handlers: {},
                services: {},
                utilities: {}
                // ...and other modules created by the user
            }
        };

        /*=== localize variables (Single-Variable Responsibility) ===*/
        var data = helpers.data,
            array = helpers.array,
            string= helpers.string;

        /**
         * create a new app.
         * @param appname
         * @returns object
         */
        function createApp(appname) {

            if (!data.isUndefined(_app.name)) {
                exception.notify("An App already exists - " + _app.name);
            }

            if (arguments.length < 1) {
                exception.notify("Appname is required.");
            }

            if (!data.isString(appname)) {
                exception.notify("Appname must be a string.");
            }

            _app.name = appname;

            // user can now use these methods on his/her
            return {
                getAppName: getAppName,
                handler: handler,
                service: service,
                utility: utility,
                module: module,
                moduleExists: moduleExists
            }
        }

        /**
         * returns the name of the app.
         * @returns string
         */
        function getAppName() {
            return _app.name;
        }

        function handler(handlerName, handler) {

            args.expect(arguments, ['array/number', 'function', 'object']);
            return;

            if (arguments.length != 2) {
                exception.notify("Handler name and function required.");
            }

            if (!data.isString(handlerName)) {
                exception.notify("First parameter is not a string. " + string.capitalizeFirstLetter(typeof handler) + " was passed");
            }

            if (!data.isFunction(handler)) {
                exception.notify("Second parameter is not a function. " + string.capitalizeFirstLetter(typeof handler) + " was passed");
            }

            if (array.keyExists(handlerName, _app.modules.handlers)) {
                exception.notify("`" + handlerName + "` handler already exists.");
            }

            // check if dependencies exists;

            _app.modules.handlers[handlerName] = handler;

            return this;
        }

        function service() {}
        function utility() {}

        function module(module, childModuleName, childModuleFunction) {

            // *check if module exists
            // if not, create a new module and populate the given child module
            // if already exists, create a new child module for the module only if the child module still doesn't exists.
            // if a child module already exists, throw an exception.

            // TODO:: dependencies on childModule function()

            if (!data.isString(module)) {
                exception.notify("First parameter is not a string. " + string.capitalizeFirstLetter(typeof module) + " was passed")
            }

            if (!data.isString(childModuleName)) {
                exception.notify("Second parameter must be a string. " + string.capitalizeFirstLetter(typeof childModuleName) + " was passed")
            }

            if(!data.isFunction(childModuleFunction)) {
                exception.notify("Third parameter must be a function. " + string.capitalizeFirstLetter(typeof childModuleFunction) + " was passed")
            }

            return;

            if (moduleExists(module)) {
                exception.notify("`" + module + "` module already exists.");
            } else {

            }

        }

        function _createModuleChild() {
            return function(name, functionality) {

                if (arguments.length != 2) {
                    exception.notify("Module child name and function required");
                }

                if (!data.isString(name)) {
                    exception.notify("First parameter is not a string. " + string.capitalizeFirstLetter(typeof functionality) + " was passed");
                }

                if (!data.isFunction(functionality)) {
                    exception.notify("Second parameter is not function. " + string.capitalizeFirstLetter(typeof functionality) + " was passed");
                }

                return (_app.modules.factory[name] = functionality)();
            };
        }

        /**
         * checks if a module already exists.
         * @param module
         * @returns {boolean}
         */
        function moduleExists(module) {
            return _app.modules.hasOwnProperty(module);
        }

        return {
            createApp: createApp
        };

    })(helpers, aventadorException, args);

})(window, undefined);