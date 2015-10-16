var myapp = aventador.createApp('ontrack');

// build in factories [handlers, services, utilities]
myapp.handler('TwitterHander', function (/* Dependencies */) {});
myapp.service('DatabaseService', function (/* Dependencies */) {});
myapp.utility('DatabaseService', function (/* Dependencies */) {});

// create a new module
myapp.module('handler', 'Facebookhandler', function(/* Dependencies */) {});

// create a new module - factory
myapp.module('factory', 'UserFactory', function (/* Dependencies */) {});