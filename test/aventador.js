var chai = require('chai'),
    expect = chai.expect,
    aventador = require('../dist/aventador.js');

describe('aventador', function() {

    var defaults = [
            'handler',
            'service',
            'factory',
            'utility',
            'model',
            'controller',
            'getHandler',
            'getService',
            'getFactory',
            'getUtility',
            'getModel'
        ]

    describe('aventador object', function () {
        it('should have appropriate methods returned', function () {
            expect(aventador).to.be.an('object')
            expect(aventador).to.have.property('module').that.is.a('function')
            expect(aventador).to.have.property('helpers').that.is.an('object')
        })
    })

    describe('module', function () {
        it('should create a new app', function() {
            var myApp = aventador.module('myApp')

            expect(myApp).to.have.keys(defaults)
        })

        it('should create modules and the modules can be injected in other modules', function () {
            var myApp = aventador.module('myApp')

            myApp
                .utility('SomeUtility', function() {
                    return {
                        someUtilityFn: someUtilityFn
                    }

                    function someUtilityFn() {
                        return typeof 123 === 'number'
                    }
                })
                .factory('SomeFactory', function(SomeUtility) {

                    expect(SomeUtility).to.be.an('object')
                    expect(SomeUtility).to.have.property('someUtilityFn').that.is.a('function')

                    return {
                        someFactoryFn: someFactoryFn
                    }

                    function someFactoryFn() {
                        return {
                            getName: 'john',
                            getEmail: 'doe'
                        }
                    }
                })
                .service('SomeService', function(SomeUtility, SomeFactory) {

                    expect(SomeFactory).to.have.property('someFactoryFn').that.is.a('function')
                    expect(SomeUtility).to.have.property('someUtilityFn').that.is.a('function')
                    expect(SomeFactory.someFactoryFn()).to.have.property('getName').that.is.a('string')

                    return {
                        someServiceFn: someServiceFn
                    }

                    function someServiceFn() {
                        return SomeUtility.someUtilityFn() ? {}: false;
                    }
                })
                .model('SomeModel', function(SomeService) {

                    expect(SomeService).to.have.property('someServiceFn').that.is.a('function')
                    expect(SomeService.someServiceFn()).to.be.an('object')
                    expect(SomeService.someServiceFn()).to.be.empty;

                    return {
                        someModelFn: someModelFn
                    }

                    function someModelFn() {
                        function foo() {
                            return ['bar']
                        }
                        return SomeService.someServiceFn() ? { foo: foo } : false
                    }
                })
                .handler('SomeHandler', function(SomeModel, SomeService) {

                    expect(SomeModel).to.have.property('someModelFn').that.is.a('function')
                    expect(SomeModel.someModelFn().foo()[0]).to.equal('bar')
                    expect(SomeService.someServiceFn()).to.be.an('object')
                    expect(SomeService.someServiceFn()).to.be.empty

                    return {
                        someHandlerFn: someHandlerFn
                    }

                    function someHandlerFn() {
                        return SomeService.someServiceFn() === {}
                    }
                })
                .controller('SomeController', function(SomeHandler) {

                    expect(SomeHandler).to.have.property('someHandlerFn').that.is.a('function')
                    expect(SomeHandler.someHandlerFn()).to.be.not.ok

                    return {
                        someHandlerFn: someHandlerFn
                    }

                    function someHandlerFn() {
                        return true;
                    }
                })
        })

    })

})