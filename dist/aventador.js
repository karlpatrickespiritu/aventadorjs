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
                var argumentExpectations = expectations[i].split('|'),
                    passedDataType = (functionArgs[i].constructor === Array ? 'array': typeof functionArgs[i])

                if (argumentExpectations.indexOf('*') !== -1) {
                    continue;
                }

                if (argumentExpectations.indexOf(passedDataType) === -1) {
                    var message = "Argument number " + (i + 1) + " must be " + expectations[i] + ", " + passedDataType + " was passed.";

                    // add results
                    results.passed = false;
                    results.errors['argument' + (i + 1)] = {
                        passedData: functionArgs[i],
                        passedDataType: passedDataType,
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
            return ['object', 'array', 'function', 'string', 'number', 'boolean', '*'].indexOf(stringDataType) !== -1;
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
;(function (window, undefined) {
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
                controller: controller,
                handler: handler,
                service: service,
                utility: utility,
                model: model,
                factory: factory,
                getHandler: getHandler,
                getService: getService,
                getModel: getModel,
                getFactory: getFactory,
                getUtility: getUtility
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

        function getHandler(handlerName) {
            args.expect(arguments, ['string'])
            return _getLayer(handlerName, 'handlers')
        }

        function getService(serviceName) {
            args.expect(arguments, ['string'])
            return _getLayer(serviceName, 'services')
        }

        function getFactory(factoryName) {
            args.expect(arguments, ['string'])
            return _getLayer(factoryName, 'factories')
        }

        function getUtility(utilityName) {
            args.expect(arguments, ['string'])
            return _getLayer(utilityName, 'utilities')
        }

        function getModel(modelName) {
            args.expect(arguments, ['string'])
            return _getLayer(modelName, 'models')
        }

        function getController(controllerName) {
            args.expect(arguments, ['string'])
            return _getLayer(controllerName, 'controllers')
        }

        function _getLayer(name, layerName) {
            var module = _app.modules[_app.activeModule],
                handlers = module[layerName]

            if (obj.keyExists(name, module[layerName])) {
                return handlers[name]
            }

            throw new AventadorException('`' + name + '` does not exists')
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
                    var stringCache = cache[dependencyName].split('.'),
                        cachedDependency = module[stringCache[1]][stringCache[2]]

                    dependencies.push(cachedDependency)
                    continue
                }

                for (var j = 0; j < layers.length; j++) {
                    var layer = layers[j],
                        isLastItem = (j === (layers.length -1)),
                        dependency = module[layer][dependencyName] || false

                    // used for checking runtime
                    // console.log(dependencyName, layer)

                    if (dependency !== false) {
                        dependencies.push(dependency)

                        // assign string location of the dependency in cache.
                        cache[dependencyName] = _app.activeModule + "." + layer + "." + dependencyName

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

if (typeof module !== 'undefined') {
    module.exports = window.aventador || {}
}