(function () {

    var myApp = aventador.module('myApp'), // create app
        $page = $('#users-page'),
        $registrationForm = $page.find('form#registration-form'),
        $usersTable = $page.find('table.users-table tbody'),
        $errors = $page.find('ul.errors')


    /*===== EVENT HANDLERS =====*/
    $registrationForm.on('submit', function (e) {
        e.preventDefault()

        var $this = $(this),
            StringUtility = myApp.getUtility('StringUtility'),
            UsersHandler = myApp.getHandler('UsersHandler'),
            data = StringUtility.queryStringToJson($this.serialize())

        UsersHandler.register(data, function(response) {
            if (response.success) {
                $.publish('users/add', [response.data.user])
            } else if (response.errors.length) {
                $.publish('users/add/errors', [response.errors])
            }
        })
    })


    /*===== PUB/SUB =====*/

    function addUser(_, user) {
        // Skip the first argument (event object) but log the name and other args.
        $usersTable.append(
                '<tr>' + 
                    '<td>' + user.getId() + '</td>' +
                    '<td>' + user.getFirstName() + '</td>' +
                    '<td>' + user.getLastName() + '</td>' +
                    '<td>' + user.getEmail() + '</td>' +
                '</tr>'
            )
    }

    function addUserErrors(_, errors) {
        $errors.html('')

        errors.forEach(function(value, index) {
            $errors.append('<li>' + value + '</li>')
        })
    }

    $.subscribe('users/add', addUser);
    $.subscribe('users/add/errors', addUserErrors);

})()