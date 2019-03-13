/* eslint-env mocha */
'use strict'

const Bootstrap = require('../src')
const peerList = require('./default-peers')
const partialValidPeerList = require('./some-invalid-peers')
const { expect } = require('chai')
const mafmt = require('mafmt')

describe('bootstrap', () => {
  it('find the other peer', function () {
    this.timeout(5 * 1000)
    const r = new Bootstrap({
      list: peerList,
      interval: 2000
    })

    const p = new Promise((resolve) => r.once('peer', resolve))
    r.start()
    return p
  })

  it('not fail on malformed peers in peer list', function () {
    this.timeout(5 * 1000)

    const r = new Bootstrap({
      list: partialValidPeerList,
      interval: 2000
    })

    const p = new Promise((resolve) => {
      r.on('peer', (peer) => {
        const peerList = peer.multiaddrs.toArray()
        expect(peerList.length).to.eq(1)
        expect(mafmt.IPFS.matches(peerList[0].toString()))
        resolve()
      })
    })

    r.start()

    return p
  })
})
