var chai = require('chai'),
    expect = chai.expect,
    aventador = require('../../src/aventador.js').aventador,
    obj = aventador.helpers.obj;

describe('obj', function () {
    var person = { first: 'John', last: 'Doe'};

    describe('keyExists', function () {
        it('key should exists', function() {
            expect(obj.keyExists('first', person)).to.be.a('boolean');
            expect(obj.keyExists('first', person)).to.be.ok;
        })
        it('key should not exists', function() {
            expect(obj.keyExists('not a key', person)).to.be.a('boolean');
            expect(obj.keyExists('not a key', person)).to.be.not.ok;
        })
    })

})