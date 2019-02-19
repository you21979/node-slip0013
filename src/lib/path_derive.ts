import {BIP32} from 'bip32'
import {removeHardend, resolvePath} from './path_resolve'

export const derivePath = ( parentnode: BIP32, pathlist: Array<number> ): BIP32 => {
    return pathlist.reduce((r, v) => r.deriveHardened( removeHardend(v) ), parentnode)
}

export const deriveUri = (parentnode: BIP32, uri: string, index: number): BIP32 => {
    const pathlist = resolvePath(uri, index)
    return derivePath(parentnode, pathlist)
}

