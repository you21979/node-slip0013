import {BIP32} from 'bip32'
import * as bitcoin from 'bitcoinjs-lib'
import * as cr from './challenge_response'
import {deriveUri} from './path_derive'

interface IBitIDResponse extends cr.IResponse{
    address: string
    uri: string
}

export const createMessage = (uri: string): string => {
    const message = "\x18Bitcoin Signed Message:\n" + uri
    return message
}

export const sign = (node: BIP32, uri: string): IBitIDResponse => {
    const res = cr.sign(node, createMessage(uri))
    return Object.assign({
        address: bitcoin.payments.p2pkh({ pubkey: res.publickey }).address,
        uri: uri,
    }, res)
}

export const verify = (res: cr.IResponse): boolean => {
    return cr.verify(res)
}

export const derive = ( parentnode: BIP32, uri: string, index: number ): BIP32 => {
    const BIP43_PURPOSE = 13
    return deriveUri( parentnode.deriveHardened(BIP43_PURPOSE), uri, index )
}

