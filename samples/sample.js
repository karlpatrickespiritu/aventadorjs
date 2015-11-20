(function () {

	var myApp = aventador.module('myApp')

    myApp
        .handler('UsersHandler', function () {
            return {
                someFn: function () {},
                someArray: []
            }
        })
        .service('UsersService', function (UsersHandler) {
            // console.log([UsersHandler])
            return {
                service: undefined
            }
        })
        .factory('UsersFactory', function (UsersService, UsersHandler) {
            // console.log([UsersService, UsersHandler])
            return {
                factory: undefined
            }
        })
        .utility('UsersUtility', function (UsersHandler, UsersService, UsersFactory) {
            return false;
        })

    console.log(myApp)

})()