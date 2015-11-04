/*
 * Dear Author,
 *
 * The Project Goal:
 * 1. enable the user to have a namespaced project
 * 2. offer user default modules to work for (handlers, services, utilities, etc..)
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
            modules: {},
            defaultModuleLayers: ['controllers', 'services', 'utilities', 'models']
        }

        // localize variables (Single-Variable Responsibility)
        var data = helpers.data,
            array = helpers.array,
            obj = helpers.obj,
            string = helpers.string

        /**
         * AventadorException object
         * @param {String}
         */
        function AventadorException(message) {
            this.name = "AventadorException"
            this.message = message
            this.toString = function () {
                return this.name + ": " + this.message
            }
        }

        function module(moduleName) {
            args.expect(arguments, ['string'])

            if (!obj.keyExists(moduleName, _app.modules)) {
                _app.modules[moduleName] = {}
            }

            _app.activeModule = moduleName

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

            _app.modules[_app.activeModule]['controllers'][controllerName] = controllerFunction.apply(this, getDependencies(controllerFunction))

            return this
        }

        function service() {
        }

        function utility() {
        }

        function model() {
        }

        /**
         *
         * @param {Function}
         * @returns {Array}
         */
        function getDependencies(fn) {
            args.expect(arguments, ['function'])

            var dependencies = getFunctionDependecyNames(fn),
                module = _app.modules[_app.activeModule]

            for (var i = 0; i < dependencies.length; i++) {
                for (var j = 0; j < _app.defaultModuleLayers; j++) {
                    console.log(_app.defaultModuleLayers[j])
                    /*if (obj.keyExists(dependencies[i], module[_app.defaultModuleLayers[j]])) {
                        dependencies[i] = module[_app.defaultModuleLayers[j]]
                    } else {
                        throw new AventadorException('dependency - ' + dependencies[i] + ' doesn\'t exists.')
                    }*/
                }
                /*if (obj.keyExists(dependencies[i], module.controllers)) {
                    dependencies[i] = module.controllers[dependencies[i]]
                } else if (obj.keyExists(dependencies[i], module.services)) {
                    dependencies[i] = module.services[dependencies[i]]
                } else if (obj.keyExists(dependencies[i], module.utilities)) {
                    dependencies[i] = module.utilities[dependencies[i]]
                } else if (obj.keyExists(dependencies[i], module.models)) {
                    dependencies[i] = module.models[dependencies[i]]
                } else {
                    throw new AventadorException('dependency - ' + dependencies[i] + ' doesn\'t exists.')
                }*/
            }

            return dependencies
        }

        /**
         * This function returns the expected parameter names of a function. Hence, dependency injection(DI).
         * Thanks for this blog (http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript),
         * I've copied Angular's dependecy injection regular expression pattern (evil laugh), with the addition
         * of .filter(Boolean) to remove empty strings.
         *
         * @param {Function}
         * @returns {Array}
         */
        function getFunctionDependecyNames(fn) {
            args.expect(arguments, ['function'])
            return fn.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',').filter(Boolean)
        }


        function _initModule() {
            var module = _app.modules[_app.activeModule]

            for (var i = 0; i < _app.defaultModuleLayers.length; i++) {
                if (!obj.keyExists(_app.defaultModuleLayers[i], module)) {
                    module[_app.defaultModuleLayers[i]] = {}
                }
            }
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