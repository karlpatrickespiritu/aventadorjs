(function(window, undefined) {
	"use strict";

	window.aventador = (function() {

		// the single object the will be used throughout the framework
		var _app = {
			name: undefined,
			handlers: [],
			services: [],
			utils: {}
		};

		/*=== Some native javascript data ulities ===*/
		_app.utils.nativeData = {
			isString: function (data) {
				return typeof data === 'string';
			},
			isUndefined: function (data) {
				return typeof data === 'undefined';
			}
		};

		/*=== Aventador's error utility ===*/
		_app.utils.error = {
			notify: function (message) {
				throw "Aventador Error: " + message;
			}
		};

		/*=== localized variables (Single-Variable Responsibility) ===*/
		var data = _app.utils.nativeData,
			error = _app.utils.error;

		/**
		* - create an app namespace
		* - return self. must be chaining
		*/
		function createApp(appname) {

			if (arguments.length < 1) {
				error.notify("Appname is required.");
			}

			if (!data.isUndefined(_app.name)) {
				error.notify("Appname already exists.");
			}

			if (!data.isString(appname)) {
				error.notify("Appname must be a string.");
			}

			_app.name = appname;

			return this;
		}

		/**
		* returns the app name.
		*/
		function getAppName() {
			return _app.name;
		}

		/*=== encalsulate aventador ====*/
		return {
			createApp: createApp,
			getAppName: getAppName
		};

	})();

})(window, undefined);