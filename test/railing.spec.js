/* eslint-env mocha */
'use strict'

const Railing = require('../src')
const peerList = require('./default-peers')
const partialValidPeerList = require('./some-invalid-peers')

describe('without verify on', () => {
  it('find the other peer', function (done) {
    this.timeout(20 * 1000)
    const r = new Railing(peerList)
    r.once('peer', (peer) => done())
    r.start(() => {})
  })

  it('not fail on malformed peers in peer list', (done) => {
    const r = new Railing(partialValidPeerList)

    r.start(() => {})

    r.once('peer', (peer) => done())
  })
})
