(function () {
    myApp
        .utility('StringUtility', function () {
            return {
                isString: isString,
                isEmpty: isEmpty,
                queryStringToJson: queryStringToJson
            }

            function isString(data) {
                return data.constructor === String
            }

            function isEmpty(data) {
                return isString(data) && data.length
            }

            function queryStringToJson(queryString) {
                return $.parseJSON('{"' + queryString.replace(/&/g, '","').replace(/=/g, '":"') + '"}');
            }
        })
})()