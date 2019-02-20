# node-slip0013
implements  SLIP-0013 : Authentication using deterministic hierarchy

https://github.com/satoshilabs/slips/blob/master/slip-0013.mdo


# install

```
npm i slip0013
```

# sample
 
## additional install

```
npm i bip39 bitcoinjs-lib bitcoinjs-message
```

## sample code

```
const slip13 = require("slip0013")
const bip39 = require("bip39")
const bip32 = require("bip32")
const bitcoin = require("bitcoinjs-lib")
const bitcoinMessage = require('bitcoinjs-message')

const main = (mnemonic, password, uri) => {
    const seed = bip39.mnemonicToSeed(mnemonic, password);
    const masternode = bip32.fromSeed(seed);
    const info = slip13.bitid.parseUri(uri)
    const node = slip13.bitid.derive(masternode, info.resolve_uri);
    const address = bitcoin.payments.p2pkh({ pubkey: node.publicKey }).address

    const signature = bitcoinMessage.sign (info.message_uri, node.privateKey, true)
    console.log(info)
    console.log(address)
    console.log(signature.toString("base64"))
}
const uri = "bitid://bitid-demo.herokuapp.com/callback?x=32b5640fdec1e804&u=1"
const mnemonic = "inhale praise target steak garlic cricket paper better evil almost sadness crawl city banner amused fringe fox insect roast aunt prefer hollow basic ladder";
const password = ""
main(mnemonic, password, uri)
```



