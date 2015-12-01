;(function() {

    var chai = require('chai'),
        expect = chai.expect,
        aventador = require('../dist/aventador.js');

    describe('aventador', function() {

        var defaults = ['handler', 'service', 'factory', 'utility', 'model', 'controller'],
            myApp = null

        beforeEach(function () {
            myApp = aventador.module('myApp')
        })

        describe('aventador object', function () {
            it('should have appropriate methods returned', function () {
                expect(aventador).to.be.an('object')
                expect(aventador).to.have.property('module').that.is.a('function')
                expect(aventador).to.have.property('helpers').that.is.an('object')
            })
        })

        describe('module', function () {
            it('should create a new app', function() {
                expect(myApp).to.have.all.keys(defaults)
            })
        })

        describe('service', function() {
            it('should create modules and the modules can be injected in other modules', function () {
                myApp
                    .service('UsersService', function () {
                        return {
                            getUsers: getUsers
                        }

                        function getUsers() {
                            return [{
                                firstName: 'John',
                                lastName: 'Doe'
                            }]
                        }
                    })
                    .handler('UsersHandler', function (UsersService) {
                        expect(UsersService).to.have.property('getUsers').that.is.a('function')
                        expect(UsersService.getUsers()).to.deep.equal([{
                            firstName: 'John',
                            lastName: 'Doe'
                        }])

                        return {
                            someFunction: someFunction
                        }

                        function someFunction() {
                            return true
                        }
                    })
                    .factory('UsersFactory', function (UsersService, UsersHandler) {

                        expect(UsersService).to.have.property('getUsers').that.is.a('function')
                        expect(UsersService.getUsers()).to.deep.equal([{
                            firstName: 'John',
                            lastName: 'Doe'
                        }])

                        console.log(UsersHandler)
                        // expect(UsersHandler).to.have.property('someFunction').that.is.a('function')
                        // expect(UsersService.someFunction()).to.be.ok

                        return {
                            factory: false
                        }
                    })
                    .utility('UsersUtility', function (UsersHandler, UsersService, UsersFactory) {
                        return false;
                    })
            })
        })

    })

})()