import { PeerId } from '@libp2p/peer-id'
import { Multiaddr } from '@multiformats/multiaddr'
import { P2P } from '@multiformats/mafmt'
import { EventEmitter } from 'events'
import debug from 'debug'
import type PeerDiscovery from '@libp2p/interfaces/peer-discovery'

const log = Object.assign(debug('libp2p:bootstrap'), {
  error: debug('libp2p:bootstrap:error')
})

export interface BootstrapOptions {
  /**
   * The list of peer addresses in multi-address format
   */
  list: string[]

  /**
   * The interval between emitting addresses in milliseconds
   */
  interval?: number
}

/**
 * Emits 'peer' events on a regular interval for each peer in the provided list.
 */
export class Bootstrap extends EventEmitter implements PeerDiscovery {
  static tag = 'bootstrap'

  private timer: NodeJS.Timer | null
  private readonly list: string[]
  private readonly interval: number

  constructor (options: BootstrapOptions = { list: [] }) {
    if (options.list == null || options.list.length === 0) {
      throw new Error('Bootstrap requires a list of peer addresses')
    }
    super()

    this.list = options.list
    this.interval = options.interval ?? 10000
    this.timer = null
  }

  isStarted () {
    return Boolean(this.timer)
  }

  /**
   * Start emitting events
   */
  start () {
    if (this.timer != null) {
      return
    }

    this.timer = setInterval(() => this._discoverBootstrapPeers(), this.interval)
    log('Starting bootstrap node discovery')
    this._discoverBootstrapPeers()
  }

  /**
   * Emit each address in the list as a PeerInfo
   */
  _discoverBootstrapPeers () {
    if (this.timer == null) {
      return
    }

    this.list.forEach((candidate) => {
      if (!P2P.matches(candidate)) {
        return log.error('Invalid multiaddr')
      }

      const ma = new Multiaddr(candidate)
      const peerIdStr = ma.getPeerId()

      if (peerIdStr == null) {
        log.error('Invalid bootstrap multiaddr without peer id')
        return
      }

      const peerId = PeerId.fromString(peerIdStr)

      try {
        this.emit('peer', {
          id: peerId,
          multiaddrs: [ma]
        })
      } catch (err) {
        log.error('Invalid bootstrap peer id', err)
      }
    })
  }

  /**
   * Stop emitting events
   */
  stop () {
    if (this.timer != null) clearInterval(this.timer)
    this.timer = null
  }
}
