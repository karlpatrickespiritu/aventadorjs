(function () {
    myApp
        .factory('UsersFactory', function () {
            return {
                newUser: newUser
            }

            function newUser(firstName, lastName, email) {
                return [{
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                }]
            }
        })
})()