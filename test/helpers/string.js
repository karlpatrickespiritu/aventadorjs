var chai = require('chai'),
    expect = chai.expect,
    aventador = require('../../src/aventador.js').aventador,
    string = aventador.helpers.string;

describe('string', function () {
    
    describe('upperCaseFirst', function() {
        it('First letter of the word must be converted into an upper case.', function() {
            var test = string.upperCaseFirst('hello');
            expect(test).to.be.a('string');
            expect(test).to.be.equal('Hello');
        })

        it('First letter of the sentence must be converted into an upper case', function() {
            var test = string.upperCaseFirst('hi, I\'m John Doe.');
            expect(test).to.be.a('string');
            expect(test).to.be.equal('Hi, I\'m John Doe.');
        })
    })

    describe('upperCaseWords', function() {
        it('First letter of every word in the sentence must be converted into an upper case letter', function() {
            var test = string.upperCaseWords('hello world. what is good?');
            expect(test).to.be.a('string');
            expect(test).to.be.equal('Hello World. What Is Good?');
        })
    })

})