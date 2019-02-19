import { createHash } from 'crypto'
import {BIP32} from 'bip32'
import * as bitcoin from 'bitcoinjs-lib'

export interface IResponse {
    signature: Buffer
    hash: Buffer
    publickey: Buffer
}

export const bufferToHash = (buffer: Buffer): Buffer => {
    const sha256 = createHash('sha256')
    return sha256.update(buffer).digest()
}

export const sign = (node: BIP32, message: string): IResponse => {
    const hash = bufferToHash(Buffer.from(message))
    const signature = node.sign(hash)
    const publickey = node.publicKey
    return { signature, hash, publickey }
}

export const verify = (res: IResponse): boolean => {
    const ecpair = bitcoin.ECPair.fromPublicKey(res.publickey)
    return ecpair.verify(res.hash, res.signature)
}

