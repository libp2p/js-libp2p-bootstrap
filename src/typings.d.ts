/**
 * @module js-libp2p-bootstrap
 */
declare module "js-libp2p-bootstrap" {
    /**
     * Constructs a new Bootstrap.
     *
     * @param {Object} options
     * @param {Array<string>} options.list - the list of peer addresses in multi-address format
     * @param {number} [options.interval] - the interval between emitting addresses (in milli-seconds)
     *
     */
    class Bootstrap {
        constructor(options: {
            list: string[];
            interval?: number;
        });
        /**
         * Start emitting events.
         */
        start(): void;
        /**
         * Emit each address in the list as a PeerInfo.
         */
        _discoverBootstrapPeers(): void;
        /**
         * Stop emitting events.
         */
        stop(): void;
    }
    /** Export tags
     */
    var tag: any;
}

