(function () {
    aventador
        .module('myApp')
        .utility('UsersUtility', function (StringUtility) {
            return {
                validateUser: validateUser
            }

            function validateUser(user) {
                var errors = [];

                if (StringUtility.isEmpty(user.firstname)) {
                    errors.push('first name must not be empty.')
                }

                if (!StringUtility.isString(user.firstname)) {
                    errors.push('first name must be a string.')
                }

                if (StringUtility.isEmpty(user.lastname)) {
                    errors.push('last name must not be empty.')
                }

                if (!StringUtility.isString(user.lastname)) {
                    errors.push('last name must be a string.')
                }

                if (StringUtility.isEmpty(user.password)) {
                    errors.push('password must not be empty.')
                } else {
                    if (StringUtility.isEmpty(user.passwordconfirm)) {
                        errors.push('confirm password must not be empty.')
                    } else if(user.passwordconfirm !== user.password) {
                        errors.push('password does not match.')
                    }
                }

                return errors
            }

        })
})()