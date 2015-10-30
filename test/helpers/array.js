var chai = require('chai'),
    expect = chai.expect,
    aventador = require('../../src/aventador.js').aventador,
    array = aventador.helpers.array;

describe('array', function () {

    var list = ['one', 'two', 'three', 'four', 'five']

    describe('exists', function () {
        it('item should exists', function () {
            expect(array.exists('one', list)).to.be.ok;
        })
        it('item should not exists', function() {
            expect(array.exists('six', list)).to.be.not.ok;
        })
    })

    describe('getIndex', function () {
        it('should return index number', function () {
            expect(array.getIndex('two', list)).to.equal(1);
            expect(array.getIndex('five', list)).to.equal(4);
        })
        it('should be -1', function () {
            expect(array.getIndex('eight', list)).to.equal(-1);
            expect(array.getIndex('nine', list)).to.equal(-1);
        })
    })

})