import { createHash } from 'crypto'

export const pushBuffer = (uri: string, index: number): Buffer => {
    const buf = Buffer.concat([Buffer.alloc(4), Buffer.from(uri)])
    buf.writeInt32LE(index, 0)
    return buf
}

export const bufferToHash = (buffer: Buffer): Buffer => {
    const sha256 = createHash('sha256')
    return sha256.update(buffer).digest()
}

export const splitBuffer = (buffer: Buffer, size: number): Array<Buffer> => {
    const result = []
    const len = buffer.length
    for(let i = 0; i<len; i += size){
        result.push(buffer.slice(i, i + size))
    }
    return result
}

export const removeHardend = ( n: number ): number => {
    return n & 0x7fffffff
}

export const resolvePath = (uri: string, index: number): Array<number> => {
    const buf = bufferToHash(pushBuffer(uri, index)).slice(0, 16)
    const path = splitBuffer(buf, 4).map( v => v.readUInt32LE(0) )
    return path
}

