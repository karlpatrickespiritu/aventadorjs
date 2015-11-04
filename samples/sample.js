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

		.controller('ProductsController', function(UsersController) {

			function getByProductId () {
				return 'call a service here..'
			}

			return {
				getByProductId: getByProductId
			}
		})

        .controller('CartsController', function(ProductsController, UsersController) {

            console.log(ProductsController)
            console.log(UsersController)

            function getByCartId () {
                return 'call a service here..'
            }

            return {
                getByCartId: getByCartId
            }
        })

})()