const slip13 = require("../dist")
const bip39 = require("bip39")
const bip32 = require("bip32")
const bitcoin = require("bitcoinjs-lib")
const bitcoinMessage = require('bitcoinjs-message')

const main = () => {
    const bitiduri = "bitid://bitid-demo.herokuapp.com/callback?x=32b5640fdec1e804&u=1"
    const mnemonic = "inhale praise target steak garlic cricket paper better evil almost sadness crawl city banner amused fringe fox insect roast aunt prefer hollow basic ladder";
    const seed = bip39.mnemonicToSeed(mnemonic, "");
    const masternode = bip32.fromSeed(seed);
    const info = slip13.bitid.parseUri(bitiduri)
    const node = slip13.bitid.derive(masternode, info.resolve_uri);
    const address = bitcoin.payments.p2pkh({ pubkey: node.publicKey }).address

    const signature = bitcoinMessage.sign (info.message_uri, node.privateKey, true)
    console.log(info)
    console.log(address)
    console.log(signature.toString("base64"))
}
main()
