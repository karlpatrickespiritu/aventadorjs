/**
 * args-checker-js: a lightweight function's arguments checker in javascript.
 *
 * (C) Karl Patrick Espiritu 2015, released under the MIT license. <https://github.com/karlpatrickespiritu>
 */
(function (window, undefined) {
    "use strict";

    window.args = (function () {

        // TODO: git pages docs
        var gitPagesRepo = "http://www.github.com/karlpatrickespiritu/args-checker-js";

        /**
         * Checks the arguments and expectations if valid.
         * @param {Array}
         * @param {Array}
         * @param {Array}
         * @returns {boolean}
         */
        function expect(functionArgs, expectations, callback) {

            var functionArgs = functionArgs || false,
                expectations = expectations || false,
                callback = callback || false,
                results = {
                    errors: {},
                    passed: true
                };

            /*==== some basic checks =====*/

            if (functionArgs === false) {
                throw new ArgumentException("Function arguments is required. \n\nFor more info, go to " + gitPagesRepo + "#api");
            }

            if (functionArgs.constructor !== Object) {
                throw new ArgumentException("Function arguments must be an instance of a function's arguments.\n\nFor more info, go to " + gitPagesRepo + "#api");
            }

            if ((expectations === false) || (expectations.length < 1)) {
                throw new ArgumentException("Expectations are required.\n\nFor more info, go to " + gitPagesRepo + "#api");
            }

            if (expectations.constructor !== Array) {
                throw new ArgumentException("Expectations must be an array of string expectations, " + typeof expectations + " was passed.\n\nFor more info, go to " + gitPagesRepo + "#api");
            }

            /*==== check if expectations are valid. ====*/

            for (var i = 0; i <= (expectations.length - 1); i++) {
                if (typeof expectations[i] !== 'string') {
                    throw new ArgumentException("Expectations must only contain valid string expectations, " + typeof expectations[i] + " was detected - `" + expectations[i] + "`. \n\nFor more info, go to " + gitPagesRepo + "#api");
                }

                var argumentExpectations = expectations[i].split('|');

                for (var j = 0; j <= (argumentExpectations.length - 1); j++) {
                    if (!validExpectation(argumentExpectations[j])) {
                        throw new ArgumentException("A malformed string of expectation was detected - `" + argumentExpectations[j] + "`. \n\nFor more info, go to " + gitPagesRepo + "#api");
                    }
                }
            }

            /*==== check expectations would pass ====*/

            if (functionArgs.length < 1) {
                throw new ArgumentException("There we\'re no arguments passed. Function expects arguments to be: (" + expectations.toString().split(',').join(', ') + "). \n\nFor more info, go to " + gitPagesRepo + "#api");
            }

            if (functionArgs.length !== expectations.length) {
                throw new ArgumentException("The number of function arguments does not match the number of expected arguments. \n\nFor more info, go to " + gitPagesRepo + "#api");
            }

            for (var i = 0; i <= (functionArgs.length - 1); i++) {
                var argumentExpectations = expectations[i].split('|');

                if (argumentExpectations.indexOf('*') !== -1) {
                    continue;
                }

                if (argumentExpectations.indexOf(typeof functionArgs[i]) === -1) {
                    var message = "Argument number " + (i + 1) + " must be " + expectations[i] + ", " + typeof functionArgs[i] + " was passed.";

                    // add results
                    results.passed = false;
                    results.errors['argument ' + (i + 1)] = {
                        passedData: functionArgs[i],
                        passedDataType: typeof functionArgs[i],
                        expects: argumentExpectations,
                        message: message
                    };

                    if (callback === false) {
                        throw new ArgumentException(message + "\n\nFor more info, go to " + gitPagesRepo + "#api");
                    }
                }
            }

            /*==== check callback and execute. ====*/

            if (callback !== false) {
                if (typeof callback !== 'function') {
                    throw new ArgumentException("Callback function must be a function, " + typeof callback + " was passed. \n\nFor more info, go to " + gitPagesRepo + "#api");
                }

                callback(results);
            }

            return results.passed;
        }

        /**
         * Checks if string passed is a valid string expectation.
         * @param {string}
         * @returns {boolean}
         */
        function validExpectation(stringDataType) {
            return ['object', 'function', 'string', 'number', 'boolean', '*'].indexOf(stringDataType) !== -1;
        }

        /**
         * ArgumentException object
         * @param {string}
         */
        function ArgumentException(message) {
            this.name = "ArgumentException";
            this.message = message;
            this.toString = function () {
                return this.name + ": " + this.message;
            };
        }

        return {
            expect: expect,
            ArgumentException: ArgumentException
        }

    })();

})(window = (typeof window !== 'undefined') ? window: {}, undefined);

if (typeof exports !== 'undefined') {
    exports.args = window.args || {};
}
/*
 * Dear Author,
 *
 * The Project Goal:
 * 1. enable the user to have a namespaced project
 * 2. offer user default modules (handlers, services, utilities, etc..)
 * 3. enable the user to create custom modules.
 * 4. offer basic helpers.
 * 3. enable module dependency injection
 * 4. dependency injection for other libraries. i.e. jquery, _loadash, etc..
 * */

(function (window, undefined) {
    "use strict"

    /**
     * Simple JS helper functions.
     */
    var helpers = {
        data: {
            isString: function (data) {
                return typeof data === 'string'
            },
            isDefined: function (data) {
                return typeof data !== 'undefined'
            },
            isFunction: function (data) {
                return typeof data === 'function'
            },
            isArray: function (data) {
                return data.constructor === Array
            }
        },
        array: {
            exists: function (data, array) {
                return array.indexOf(data) !== -1
            },
            getIndex: function (property, array) {
                return array.indexOf(property)
            }
        },
        obj: {
            keyExists: function (key, obj) {
                return helpers.data.isDefined(obj[key])
            }
        },
        string: {
            upperCaseFirst: function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1)
            },
            upperCaseWords: function (string) {
                var words = string.split(' ')

                for (var i = 0; i <= (words.length - 1); i++)
                    words[i] = helpers.string.upperCaseFirst(words[i])

                return words.join(' ')
            }
        }
    }

    var aventador = (function (helpers, args) {

        var _app = {
            // the indicator what module is currently used 
            activeModule: undefined,
            modules: {}
        }

        // localize variables (Single-Variable Responsibility)
        var data = helpers.data,
            array = helpers.array,
            obj = helpers.obj,
            string = helpers.string

        function module(moduleName) {
            args.expect(arguments, ['string'])

            if (!obj.keyExists(moduleName, _app.modules)) {
                _app.modules[moduleName] = {};
            }

            _app.activeModule = moduleName;

            _initModule()

            return {
                _app: _app,
                controller: controller,
                service: service,
                utility: utility,
                model: model
            }
        }

        function controller(controllerName, controllerFunction) {
            args.expect(arguments, ['string', 'function'])

            var dependencies = getFunctionDependecies(controllerFunction),
                module = _app.modules[_app.activeModule]

            for (var i = 0; i <= (dependencies.length - 1); i++) {
                if (obj.keyExists(dependencies[i], module.controllers)) {
                    // var d = module.controllers[dependencies[i]];
                }
            }

            module.controllers[controllerName] = controllerFunction()

            return this
        }

        function getChildModule(parentModuleName, childModuleName) {
            args.expect(arguments, ['string', 'string'])

            console.log(_app.modules[_app.activeModule][parentModuleName]);
        }

        /**
         * This function returns the expected parameter names of a function. Hence, dependency injection(DI).
         * Thanks for this blog (http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript),
         * I've copied Angular's dependecy injection regular expression pattern (evil laugh).
         *
         * @param {Function}
         * @returns {Array}
         */
        function getFunctionDependecies(fn) {
            args.expect(arguments, ['function'])
            return fn.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',')
        }


        function _initModule() {
            var module = _app.modules[_app.activeModule];

            if (!obj.keyExists('controllers', _app.modules[_app.activeModule])) {
                module.controllers = {};
            }

            if (!obj.keyExists('models', _app.modules[_app.activeModule])) {
                module.models = {};
            }

            if (!obj.keyExists('services', _app.modules[_app.activeModule])) {
                module.services = {};
            }

            if (!obj.keyExists('utilities', _app.modules[_app.activeModule])) {
                module.utilities = {};
            }
        }

        function service() {
        }

        function utility() {
        }

        function model() {
        }

        return {
            module: module,
            helpers: helpers
        }

    })(helpers, window.args)

    // expose to global object
    window.aventador = aventador

})(window = (typeof window !== 'undefined') ? window : {}, undefined)

if (typeof exports !== 'undefined') {
    exports.aventador = window.aventador || {}
}