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
    var params = (function (helpers) {
        // localize helpers
        var data = helpers.data,
            string = helpers.string,
            array = helpers.array;

        function expect(expectation, callback) {

            // check for null
            // callback is optional

            if (arguments.length < 2) {
                throw "Invalid number of arguments.";
            }

            if (!data.isArray(expectation)) {
                _throwError(1, 'array');
            }

            if (!data.isFunction(callback)) {
                _throwError(2, 'function');
            }
        }

        function _throwError(argumentIndex, mustbe) {
            throw {
                name: 'name',
                message: 'message'
            };
            return;
            throw "Exception: argument number " + argumentIndex + " must be an " + mustbe;
        }

        return {
            expect: expect
        }
    })(helpers);

    window.aventador = (function (helpers, exception, params) {

        console.log(params.expect([], 1));
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

            if (arguments.length != 2) {
                exception.notify("Handler name and function required.");
            }

            if (!data.isString(handlerName)) {
                exception.notify("First parameter is not a string. " + string.capitalizeFirstLetter(typeof handler) + " was passed.");
            }

            if (!data.isFunction(handler)) {
                exception.notify("Second parameter is not a function. " + string.capitalizeFirstLetter(typeof handler) + " was passed.");
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
                exception.notify("First parameter is not a string. " + string.capitalizeFirstLetter(typeof module) + " was passed.")
            }

            if (!data.isString(childModuleName)) {
                exception.notify("Second parameter must be a string. " + string.capitalizeFirstLetter(typeof childModuleName) + " was passed.")
            }

            if(!data.isFunction(childModuleFunction)) {
                exception.notify("Third parameter must be a function. " + string.capitalizeFirstLetter(typeof childModuleFunction) + " was passed.")
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
                    exception.notify("Module child name and function required.");
                }

                if (!data.isString(name)) {
                    exception.notify("First parameter is not a string. " + string.capitalizeFirstLetter(typeof functionality) + " was passed.");
                }

                if (!data.isFunction(functionality)) {
                    exception.notify("Second parameter is not function. " + string.capitalizeFirstLetter(typeof functionality) + " was passed.");
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

    })(helpers, aventadorException, params);

})(window, undefined);