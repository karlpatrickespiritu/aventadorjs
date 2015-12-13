(function (window, aventador) {

    aventador
        .module('myApp')
        .service('UsersService', UsersService)

    function UsersService() {

        // NOTE: data should be saved in a database. this is just temporary
        var users = {}

        return {
            getUsers: getUsers,
            register: register
        }

        function getUsers() {
            return users
        }

        function register(user) {
            return users[user.getId()] = user
        }
    }

})(window, aventador)