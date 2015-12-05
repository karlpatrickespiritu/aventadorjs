(function () {
    aventador
        .module('myApp')
        .utility('StringUtility', function () {
            return {
                isString: isString,
                isEmpty: isEmpty,
                queryStringToJson: queryStringToJson
            }

            function isString(data) {
                return typeof data === 'string'
            }

            function isEmpty(data) {
                return isString(data) && data.length < 1
            }

            function queryStringToJson(queryString) {
                return $.parseJSON('{"' + queryString.replace(/&/g, '","').replace(/=/g, '":"') + '"}');
            }
        })
})()