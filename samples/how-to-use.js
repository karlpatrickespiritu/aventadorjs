// aventador default module
aventador
    
    .module('myApp')

    .controller('UsersHandler', function (/* dependencies */) {

    })

    .model('UsersModel', function (/* dependencies */) {

    })

    .service('TwitterUsersService', function (/* dependencies */) {

    })

    .utility('UsersUtility', function (/* dependencies */) {

    });

// aventador custom module
aventador
	.module('myApp')
	.custom('someCustomModule')
	.someCustomModule('CustomSomething', function () {
		
	});