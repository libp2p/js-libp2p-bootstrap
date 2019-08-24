// The typings test should run only in the node
// environment
const ts = require("typescript");
const tt = require("typescript-definition-tester")
const fs = require("fs")
const chai = require("chai")

describe('typings declaration tests', () => {
    it('should compile typings examples successfully against types.d.ts', (done) => {
        tt.compileDirectory(
            __dirname + '/typings',
            (fileName) => fileName.indexOf('.ts') > -1,
            (error) => done(error)
            );
    });
});