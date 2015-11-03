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