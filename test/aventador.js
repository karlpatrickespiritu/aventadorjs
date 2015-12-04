;(function() {

    var chai = require('chai'),
        expect = chai.expect,
        aventador = require('../dist/aventador.js');

    describe('aventador', function() {

        var defaults = ['handler', 'service', 'factory', 'utility', 'model', 'controller'],
            myApp = null

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

                expect(myApp).to.have.all.keys(defaults)
            })

            it('should create modules and the modules can be injected in other modules', function () {
                var myApp = aventador.module('myApp')
            })

        })

    })

})()