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
            }
        },
        array: {
            keyExists: function (key, array) {
                return !helpers.data.isUndefined(array[key]);
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


    window.aventador = (function (helpers, exception) {

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

        function module(moduleName) {
            if (!data.isString(moduleName)) {
                exception.notify("Module name must be a string. " + string.capitalizeFirstLetter(typeof moduleName) + " was passed.")
            }

            if (moduleExists(moduleName)) {
                exception.notify("`" + moduleName + "` module already exists.");
            }

            // add module
            _app.modules[moduleName] = {};

            // TODO:: dependency injection

            this[moduleName] = _createModuleChild();

            return this;
        }

        function _createModuleChild() {
            return function(name, functionality) {
                console.log(_app.modules);
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
         * @param moduleName
         * @returns {boolean}
         */
        function moduleExists(moduleName) {
            return _app.modules.hasOwnProperty(moduleName);
        }

        return {
            createApp: createApp
        };

    })(helpers, aventadorException);
})(window, undefined);