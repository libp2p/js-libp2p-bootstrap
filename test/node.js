/* eslint-env mocha */
'use strict'

const tt = require('typescript-definition-tester')
// typings test should run only in the node
// environment due to reading of files
describe('typings declaration tests', () => {
  it('should compile typings examples successfully against types.d.ts', (done) => {
    tt.compileDirectory(
      `${__dirname}/typings`,
      (fileName) => fileName.indexOf('.ts') > -1,
      (error) => done(error)
    )
  })
})
