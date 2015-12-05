// create app
var myApp = aventador.module('myApp')

;(function () {
    var $registrationForm = $('form#registration-form')

    $registrationForm.on('submit', function (e) {
        e.preventDefault()

        var $this = $(this),
            StringUtility = myApp.getUtility('StringUtility'),
            UsersHandler = myApp.getHandler('UsersHandler'),
            data = StringUtility.queryStringToJson($this.serialize())

        UsersHandler.register(data, function(response) {
            if (response.success) {
                console.log(UsersHandler.getUsers())
            }
            console.log(response.data.user.getId())
            console.log(response.data.user.getFirstName())
            console.log(response.data.user.getLastName())
            console.log(response.data.user.getEmail())
            console.log(response.data.user.getPassword())
        })
    })
})()