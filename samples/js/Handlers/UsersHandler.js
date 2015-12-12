(function (window, aventador) {

    aventador
        .module('myApp')
        .handler('UsersHandler', UsersHandler)

    function UsersHandler(UsersFactory, UsersService, UsersUtility) {
        return {
            getUsers: getUsers,
            register: register
        }

        function register(data, callback) {
            var callback = callback || false,
                errors = UsersUtility.validateUser(data),
                response = {
                    success: false,
                    errors: errors,
                    data: {}
                }

            if (!response.errors.length) {
                var user = UsersFactory.create(
                    data.firstname,
                    data.lastname,
                    data.email,
                    data.password
                )

                response.data.user = UsersService.register(user)
                response.success = Boolean(response.data.user)
            }

            if (callback) callback(response)
        }

        function getUsers() {
            return UsersService.getUsers()
        }
    }

})(window, aventador)