/* eslint-env mocha */

import tests from '@libp2p/interface-peer-discovery-compliance-tests'
import { bootstrap } from '../src/index.js'
import peerList from './fixtures/default-peers.js'
import { Components } from '@libp2p/components'
import { PersistentPeerStore } from '@libp2p/peer-store'
import { MemoryDatastore } from 'datastore-core'

describe('compliance tests', () => {
  tests({
    async setup () {
      const datastore = new MemoryDatastore()
      const peerStore = new PersistentPeerStore()
      const components = new Components({
        peerStore,
        datastore
      })
      peerStore.init(components)

      return bootstrap({
        list: peerList,
        timeout: 100
      })(components)
    },
    async teardown () {}
  })
})
