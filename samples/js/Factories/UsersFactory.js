(function () {
    myApp
        .factory('UsersFactory', function () {
            return {
                create: create
            }

            function user(user) {
                var user = {
                    id: Math.floor((Math.random() * 1000) + 1) + '' + user.firstName + ''+ user.lastName,
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    email: user.email || '',
                    password: user.password || ''
                }

                function getId() {
                    return user.id
                }

                function getFirstName() {
                    return user.firstName
                }

                function getLastName() {
                    return user.lastName
                }

                function getEmail() {
                    return user.email
                }

                function getPassword() {
                    return user.password
                }

                return {
                    getId: getId,
                    getFirstName: getFirstName,
                    getLastName: getLastName,
                    getEmail: getEmail,
                    getPassword: getPassword
                }
            }

            function create(firstName, lastName, email, password) {
                return user({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            }
        })
})()