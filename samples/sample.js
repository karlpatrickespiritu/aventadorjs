(function () {

	var myApp = aventador.module('myApp')

    myApp
        .service('UsersService', function () {
            return {
                getUsers: getUsers
            }

            function getUsers() {
                return [{
                    firstName: 'John',
                    lastName: 'Doe'
                }]
            }
        })
        .handler('UsersHandler', function (UsersService) {

            console.log([UsersService])

            return {
                someFunction: someFunction
            }

            function someFunction() {
                return true
            }
        })
        .factory('UsersFactory', function (UsersService, UsersHandler) {

            console.log([UsersService, UsersHandler])

            return {
                factory: false
            }
        })
        .utility('UsersUtility', function (UsersHandler, UsersService, UsersFactory) {

            console.log([UsersHandler, UsersService, UsersFactory])

            return false;
        })
})()