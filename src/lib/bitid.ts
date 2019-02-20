import {parse} from 'url'
import {BIP32} from 'bip32'
import {deriveUri} from './path_derive'

export interface IBitIDUri {
    uri: string
    href: string
    message_uri: string
    resolve_uri: string
}

export const parseUri = (uri: string): IBitIDUri => {
    const u = parse(uri)
    const href = `https://${u.host}${u.path}`
    const message_uri = uri
    const resolve_uri = `https://${u.host}${u.pathname}`
    return { uri, href, message_uri, resolve_uri  } 
}

export const derive = ( parentnode: BIP32, uri: string, index: number = 0): BIP32 => {
    const BIP43_PURPOSE = 13
    return deriveUri( parentnode.deriveHardened(BIP43_PURPOSE), uri, index )
}

