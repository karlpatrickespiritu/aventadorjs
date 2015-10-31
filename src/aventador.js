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
    "use strict";

    /**
     * Simple JS helper functions.
     */
    var helpers = {
        data: {
            isString: function(data) {
                return typeof data === 'string';
            },
            isDefined: function(data) {
                return typeof data !== 'undefined';
            },
            isFunction: function(data) {
                return typeof data === 'function';
            },
            isArray: function(data) {
                return data.constructor === Array;
            }
        },
        array: {
            exists: function (data, array) {
                return array.indexOf(data) !== -1;
            },
            getIndex: function(property, array) {
                return array.indexOf(property);
            }
        },
        obj: {
            keyExists: function (key, obj) {
                return helpers.data.isDefined(obj[key]);
            }
        },
        string: {
            upperCaseFirst: function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            upperCaseWords: function(string) {
                var words = string.split(' ');
                
                for(var i = 0; i <= (words.length - 1); i++)
                    words[i] = helpers.string.upperCaseFirst(words[i]);

                return words.join(' ');
            }
        }
    };

    var aventador = (function () {
        return {
            helpers: helpers
        }
    })();

    // expose to global object
    window.aventador = aventador;

})(window = (typeof window !== 'undefined') ? window: {}, undefined);

if (typeof exports !== 'undefined') {
    exports.aventador = window.aventador || {};
}