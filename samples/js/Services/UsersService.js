(function () {
    myApp
        .service('UsersService', function () {
            return {
                getUsers: getUsers,
                registerUser: registerUser
            }

            function getUsers() {
                return []
            }

            function registerUser(user) {
                return user ? true: false;
            }
        })
})()