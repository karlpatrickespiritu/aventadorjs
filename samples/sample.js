(function () {

	var myApp = aventador.module('myApp');

	myApp
		.controller('UsersController', function () {

			function getById() {
				return 'call a service here..'
			}

			return {
				getById: getById
			}
		})

		.controller('ProductsController', function() {

			function getByProductId () {
				return 'call a service here..'
			}

			return {
				getByProductId: getByProductId
			}
		})

	console.log(myApp);

})()