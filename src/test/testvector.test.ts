import * as assert from 'assert'
import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
import * as bitcoin from 'bitcoinjs-lib'
import * as resolve from '../lib/path_resolve'
import * as derive from '../lib/path_derive'
import * as cr from '../lib/challenge_response'
import * as bitid from '../lib/bitid'

describe('slip0013 path test', () => {
    const uri = "https://satoshi@bitcoin.org/login"
    const index = 0
    const anshash = "d0e2389d4c8394a9f3e32de01104bf6e8db2d9e2bb0905d60fffa5a18fd696db"
    const anspath = "m/2147483661/2637750992/2845082444/3761103859/4005495825"
    it('internal test 1', () => {
        const hash = resolve.bufferToHash(resolve.pushBuffer(uri, index)).toString("hex")
        assert(hash === anshash)
    })
    it('internal test 2', () => {
        const hash = resolve.bufferToHash(resolve.pushBuffer(uri, index)).toString("hex")
        assert(hash === anshash)
    })
    it('internal test 3', () => {
        const path = 'm/' + resolve.resolvePath(uri, index).map(v => resolve.removeHardend(v)).join('/')
        assert(path, anspath)
    })
})

describe('bitid hd test', () => {
    const mnemonic = "inhale praise target steak garlic cricket paper better evil almost sadness crawl city banner amused fringe fox insect roast aunt prefer hollow basic ladder"
    const uri = "http://bitid.bitcoin.blue/callback"
    const index = 0
    const ansbin = "00000000687474703a2f2f62697469642e626974636f696e2e626c75652f63616c6c6261636b"
    const anshash = "123155becf82afc03bfb614337bfd2eddae7046183a6d1a6dfb02b1966fdb321"
    const ansaddr = "1J34vj4wowwPYafbeibZGht3zy3qERoUM1"

    const seed = bip39.mnemonicToSeed(mnemonic, "")
    const masternode = bip32.fromSeed(seed)

    it('internal test 1', () => {
        const concatbuff = resolve.pushBuffer(uri, index).toString("hex")
        assert(concatbuff === ansbin)
    })
    it('internal test 2', () => {
        const hash = resolve.bufferToHash(resolve.pushBuffer(uri, index)).toString("hex")
        assert(hash === anshash)
    })
    it('internal test 3', () => {
        const node = bitid.derive(masternode, uri, index)
        const addr = bitcoin.payments.p2pkh({ pubkey: node.publicKey }).address
        assert(addr === ansaddr)
    })
})
describe('bitid sign test', () => {
    const mnemonic = "inhale praise target steak garlic cricket paper better evil almost sadness crawl city banner amused fringe fox insect roast aunt prefer hollow basic ladder"
    const uri = "http://bitid.bitcoin.blue/callback"
    const index = 0
    const seed = bip39.mnemonicToSeed(mnemonic, "")
    const masternode = bip32.fromSeed(seed)
    const node = bitid.derive(masternode, uri, index)
    const bitiduri = "bitid:bitid.bitcoin.blue/callback?x=10000000"

    it('internal test 1', () => {
        const data = bitid.sign(node, bitiduri)
        assert(bitid.verify(data) === true)
    })
})

