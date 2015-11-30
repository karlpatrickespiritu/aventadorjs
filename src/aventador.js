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
            defaultModuleLayers: ['handlers', 'services', 'factories', 'utilities', 'models', 'controllers'],
            dependenciesCache: {}
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
                handler: handler,
                service: service,
                utility: utility,
                model: model,
                factory: factory
            }
        }

        function handler(handlerName, handlerFunction) {
            args.expect(arguments, ['string', 'function'])
            _register('handlers', handlerName, handlerFunction)
            return this
        }

        function factory(factoryName, factoryFunction) {
            args.expect(arguments, ['string', 'function'])
            _register('factories', factoryName, factoryFunction)
            return this
        }

        function controller(controllerName, controllerFunction) {
            args.expect(arguments, ['string', 'function'])
            _register('controllers', controllerName, controllerFunction)
            return this
        }

        function service(serviceName, serviceFunction) {
            args.expect(arguments, ['string', 'function'])
            _register('services', serviceName, serviceFunction)
            return this
        }

        function utility(utilityName, utilityFunction) {
            args.expect(arguments, ['string', 'function'])
            _register('utilities', utilityName, utilityFunction)
            return this
        }

        function model(modelName, modelFunction) {
            args.expect(arguments, ['string', 'function'])
            _register('models', modelName, modelFunction)
            return this
        }

        function _register(layerName, fnName, fn) {
            var module = _app.modules[_app.activeModule],
                layer = module[layerName]

            if (obj.keyExists(fnName, module[layerName])) {
                throw new AventadorException('An existing `' + fnName + '` is already defined in ' + layerName + '.')
            }

            return layer[fnName] = fn.apply(this, _getDependencies(fn))
        }

        function _isDependencyIncache(dependencyName) {
            return obj.keyExists(dependencyName, _app.dependenciesCache)
        }

        /**
         * Returns the dependencies if found. if not, an exception will be thrown.
         * @param {Function}
         * @returns {Array}
         */
        function _getDependencies(fn) {
            var dependencyNames = _getFunctionDependecyNames(fn),
                module = _app.modules[_app.activeModule],
                layers = _app.defaultModuleLayers,
                cache = _app.dependenciesCache,
                dependencies = []

            for (var i = 0; i < dependencyNames.length; i++) {
                var dependencyName = dependencyNames[i]

                if (_isDependencyIncache(dependencyName)) {
                    dependencies.push(cache[dependencyName])
                    break
                }

                for (var j = 0; j < layers.length; j++) {
                    var layer = layers[j],
                        isLastItem = (j === (layers.length -1)),
                        dependency = module[layer][dependencyName] || false

                    // used for checking runtime
                    // console.log(dependencyName, layer)

                    if (dependency !== false) {
                        dependencies.push(dependency)
                        cache[dependencyName] = dependency
                        break
                    }

                    if (isLastItem) {
                        throw new AventadorException('dependency `' + dependencyName + '` doesn\'t exists.')
                    }
                }
            }

            return dependencies
        }

        /**
         * This function returns the expected parameter names of a function. Hence, dependency injection(DI).
         * Thanks for this blog (http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript),
         * I've copied Angular's dependency injection regular expression pattern (evil laugh), with the addition
         * of .filter(Boolean) to remove empty strings.
         * @param {Function}
         * @returns {Array}
         */
        function _getFunctionDependecyNames(fn) {
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