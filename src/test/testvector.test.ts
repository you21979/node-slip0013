import * as assert from 'assert'
import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
import * as bitcoin from 'bitcoinjs-lib'
import * as resolve from '../lib/path_resolve'
import * as derive from '../lib/path_derive'

describe('bitid test', () => {

    const mnemonic = "inhale praise target steak garlic cricket paper better evil almost sadness crawl city banner amused fringe fox insect roast aunt prefer hollow basic ladder"
    const uri = "http://bitid.bitcoin.blue/callback"
    const index = 0

    const ansbin = "00000000687474703a2f2f62697469642e626974636f696e2e626c75652f63616c6c6261636b"
    const anshash = "123155becf82afc03bfb614337bfd2eddae7046183a6d1a6dfb02b1966fdb321"
    const anspath = "13'/0xbe553112'/0xc0af82cf'/0x4361fb3b'/0xedd2bf37'"
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
        const node = derive.deriveUri(masternode, uri, index)
        const addr = bitcoin.payments.p2pkh({ pubkey: node.publicKey }).address
        assert(addr === ansaddr)
    })
})
