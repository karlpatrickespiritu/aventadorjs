var chai = require('chai'),
    expect = chai.expect,
    aventador = require('../../src/aventador.js').aventador,
    data = aventador.helpers.data;

describe('data', function () {

    describe('isString', function () {
        it('should be a string', function () {
            expect(data.isString('John')).to.be.a('boolean');
            expect(data.isString('John')).to.be.ok;
            expect(data.isString('')).to.be.ok;
        })
        it('should not be a string', function () {
            expect(data.isString({})).to.be.a('boolean');
            expect(data.isString({})).to.be.not.ok;
            expect(data.isString(123)).to.be.not.ok;
        })
    })

    describe('isDefined', function () {
        var obj = { first: 'John', last: 'Doe'};

        it('should be defined', function () {
            expect(data.isDefined(obj.first)).to.be.a('boolean');
            expect(data.isDefined(obj.first)).to.be.ok;
            expect(data.isDefined(obj.last)).to.be.ok;
        })
        it('should be undefined', function () {
            expect(data.isDefined(obj.first)).to.be.a('boolean');
            expect(data.isDefined(undefined)).to.be.not.ok;
            expect(data.isDefined(obj['keynotexists'])).to.be.not.ok;
        })
    })

    describe('isFunction', function() {
        var func = function () {};

        it('should be a function', function () {
            expect(data.isFunction(func)).to.be.a('boolean');
            expect(data.isFunction(func)).to.be.ok;
        })

        it('should not be a function', function () {
            expect(data.isFunction({})).to.be.a('boolean');
            expect(data.isFunction({})).to.be.not.ok;
        })
    })

    describe('isArray', function () {
        it('should be an array', function () {
            expect(data.isArray([])).to.be.a('boolean');
            expect(data.isArray([])).to.be.ok;
        })

        it('should not be an array', function () {
            expect(data.isArray({})).to.be.a('boolean');
            expect(data.isArray({})).to.be.not.ok;
        })
    })

})