import { randomBytes } from "crypto";

export function generateUuidV4(): string {
    
    // 1. Generate random 128 bits (16 bytes)
    const bytes: Buffer = randomBytes(16);
    
    // 2. Setting the version
    // (a) Set the 7th byte's first 3 bits to Binary 100
    //     to set the version of the UUID to 4
    // (b) and leave the last 5 bits as is
    bytes[6] = 0x40 | (bytes[6] & 0xf);

    // 3. Set the  variant
    // (a) Set the 9th byte's first two bits to Binary 10
    // (b) and leave the rest of the bits as is
    bytes[8] = 0x80 | (bytes[8] & 0x3f);

    // 4. Convert the bytes to hexadecimal representation
    const hex = bytes.toString('hex');

    // 5. Add hyphens to hex string to comply with the 8-4-4-4-12 (xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx) layout
    const uuid = `${hex.substring(0,8)}-${hex.substring(8,12)}-${hex.substring(12,16)}-${hex.substring(16,20)}-${hex.substring(20)}`;
    return uuid;
}