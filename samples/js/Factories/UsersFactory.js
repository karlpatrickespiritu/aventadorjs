(function () {
    aventador
        .module('myApp')
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

                this.getId = function() {
                    return user.id
                }

                this.getFirstName = function() {
                    return user.firstName
                }

                this.getLastName = function() {
                    return user.lastName
                }

                this.getEmail = function() {
                    return user.email
                }

                this.getPassword = function() {
                    return user.password
                }

                return this
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