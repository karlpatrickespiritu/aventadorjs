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
            console.log(response)
        })
    })
})()