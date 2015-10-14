(function(window, undefined) {
	"use strict";

	/**
	* Simple JS helper functions.
	*/
	var helpers = {
		data: {
			isString: function (data) {
				return typeof data === 'string';
			},
			isUndefined: function (data) {
				return typeof data === 'undefined';
			}
		},
		array: {
			keyExists: function(key, array) {
				return !helpers.data.isUndefined(array[key]);
			}
		}	
	};

	var aventadorException = (function() {
		return {
			notify: notify
		}

		function notify() {
			throw "Aventador Exception: " + message;	
		}
	});

	window.aventador = (function(helpers, exception) {

		// the single object the will be used throughout the framework
		var _app = {
			name: undefined,
			handlers: [],
			services: []
		};

		/*=== localize variables (Single-Variable Responsibility) ===*/
		var data = helpers.data,
			array = helpers.array;

		function createApp(appname) {

			if (arguments.length < 1) {
				exception.notify("Appname is required.");
			}

			if (!data.isUndefined(_app.name)) {
				exception.notify("Appname already exists.");
			}

			if (!data.isString(appname)) {
				exception.notify("Appname must be a string.");
			}

			_app.name = appname;

			// make the appname as the namespace of the app
			return window[_app.name] = this;
		}

		/**
		* returns the app name.
		*/
		function getAppName() {
			return _app.name;
		}

		/**
		* Create a handler
		*/
		function handler(handlerName, handler) {
			if (!array.keyExists(handlerName, _app.handlers)) {
				exception.notify(handlerName + " already a defined handler.");
			}
		}

		/*=== encalsulate aventador ====*/
		return {
			createApp: createApp,
			getAppName: getAppName,
			handler: handler
		};

	})(helpers, aventadorException);

})(window, undefined);