(function () {
    myApp
        .utility('UsersUtility', function (StringUtility) {
            return {
                validateUser: validateUser
            }

            function validateUser(user) {
                var errors = [];

                if (StringUtility.isEmpty(user.firstName)) {
                    errors.push(user.firstName + ' must not be empty.')
                }

                if (!StringUtility.isString(user.firstName)) {
                    errors.push(user.firstName + ' must be a string')
                }

                return errors
            }

            function serializeToJson () {

            }

        })
})()