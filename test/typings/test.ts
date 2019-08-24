/// <reference path="../../src/typings.d.ts" />

import { Bootstrap } from "js-libp2p-bootstrap";
const bootstrap1 = new Bootstrap({list: ["item"], interval: 1})
bootstrap1.start()