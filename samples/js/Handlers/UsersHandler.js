(function () {
    myApp
        .handler('UsersHandler', function (UsersService) {
            return {
                register: register
            }

            function register(data, callback) {
                var callback = callback || false

                if (callback) {
                    callback(data)
                }
            }
        })
})()