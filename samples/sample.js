(function () {

	var myApp = aventador.module('myApp');

	myApp
		.controller('UsersController', function () {

			function getById() {
				return 'call a service user here..'
			}

			return {
				getById: getById
			}
		})

        .service('UsersService', function (UsersController) {
            return {}
        })

		.controller('ProductsController', function(UsersController) {

			function getByProductId () {
				return 'call a product service here..'
			}

			return {
				getByProductId: getByProductId
			}
		})

        .controller('CartsController', function(ProductsController, UsersController) {

            console.log(UsersController.getById())
            console.log(ProductsController.getByProductId())

            function getByCartId () {
                return 'call a service here..'
            }

            return {
                getByCartId: getByCartId
            }
        })

    console.log(myApp._app.modules);
})()