/*
 * Dear Author,
 *
 * The Project Goal:
 * 1. enable the user to have a name-spaced project
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
         *
         * @param {String}
         */
        function AventadorException(message) {
            this.name = "AventadorException"
            this.message = message
            this.toString = function () {
                return this.name + ": " + this.message
            }
        }

        /**
         * This method created default layers for a module if module is first created.
         * Returns module public methods (controller, models, utility).
         *
         * @param {String}
         * @returns {Object}
         */
        function module(moduleName) {
            args.expect(arguments, ['string'])

            if (!obj.keyExists(moduleName, _app.modules)) {
                _app.modules[moduleName] = {}
            }

            _app.activeModule = moduleName

            _createLayers()

            return {
                _app: _app,
                controller: controller,
                service: service,
                utility: utility,
                model: model
            }
        }

        function controller(controllerName, controllerFunction) {
            _register('controllers', controllerName, controllerFunction)
            return this
        }

        function service(serviceName, serviceFunction) {
            _register('services', serviceName, serviceFunction)
            return this
        }

        function utility(utilityName, utilityFunction) {
            _register('utilities', utilityName, utilityFunction)
            return this
        }

        function model(modelName, modelFunction) {
            _register('models', modelName, modelFunction)
            return this
        }

        function _register(layerName, name, fn) {
            args.expect(arguments, ['string', 'string', 'function'])

            var module = _app.modules[_app.activeModule],
                layer = module[layerName]

            // check if layer fn already exists, throw error
            //if (obj.keyExists(layer[name], module[layer]))

            return layer[name] = fn.apply(this, _getDependencies(fn))
        }

        /**
         * Returns the dependencies if found. if not, an exception will be thrown.
         * @param {Function}
         * @returns {Array}
         */
        function _getDependencies(fn) {
            args.expect(arguments, ['function'])

            var dependencies = _getFunctionDependecyNames(fn),
                module = _app.modules[_app.activeModule],
                layers = _app.defaultModuleLayers

            for (var i = 0; i < dependencies.length; i++) {
                for (var j = 0; j < layers.length; j++) {
                    if (obj.keyExists(dependencies[i], module[layers[j]])) {
                        dependencies[i] = module[layers[j]][dependencies[i]]
                        break
                    }

                    throw new AventadorException('dependency - ' + dependencies[i] + ' doesn\'t exists.')
                }
            }

            return dependencies
        }

        /**
         * This function returns the expected parameter names of a function. Hence, dependency injection(DI).
         * Thanks for this blog (http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript),
         * I've copied Angular's dependecy injection regular expression pattern (evil laugh), with the addition
         * of .filter(Boolean) to remove empty strings.
         * @param {Function}
         * @returns {Array}
         */
        function _getFunctionDependecyNames(fn) {
            args.expect(arguments, ['function'])
            return fn.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',').filter(Boolean)
        }

        /**
         * Create default layers for a module if layer not specified.
         * @returns {void}
         */
        function _createLayers() {
            var module = _app.modules[_app.activeModule],
                layers = _app.defaultModuleLayers

            for (var i = 0; i < layers.length; i++) {
                if (!obj.keyExists(layers[i], module)) {
                    module[layers[i]] = {}
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