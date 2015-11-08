(function () {

	var myApp = aventador.module('myApp');

	myApp
		.controller('UsersController', function () {

			function getById() {
				return 'UsersController.getById()'
			}

			return {
				getById: getById
			}
		})

        .service('UsersService', function (UsersController) {
            return {
            	service: function () { return 'UsersService.service()' }
            }
        })

		.controller('ProductsController', function(UsersController) {

			function getByProductId() {
				return 'ProductsController.getByProductId()'
			}

			return {
				getByProductId: getByProductId
			}
		})

        .controller('CartsController', function(ProductsController, UsersController, UsersService) {

        	/*console.log('\n\n')
            console.log(UsersController.getById())
            console.log(ProductsController.getByProductId())
            console.log(UsersService.service())
            console.log('\n\n')*/

            function getByCartId () {
                return 'CartsController.getByCartId()'
            }

            return {
                getByCartId: getByCartId
            }
        })

    console.log(myApp._app.modules);
})()