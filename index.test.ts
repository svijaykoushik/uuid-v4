import { expect } from "chai";
import { generateUuidV4 } from "."

describe("UUID V4 generator", () => {
    it("Should return a string", () => {
        const uuid = generateUuidV4();
        expect(uuid).to.be.a('string')
    });
    it("Should return a string with exactly 36 characters", () => {
        const uuid = generateUuidV4();
        expect(uuid).to.have.lengthOf(36);
    });
    it("Should be of the format 8-4-4-4-12 (xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx, x->hexadecimal digit, M->version and N->variant) ", () => {
        const uuid = generateUuidV4();
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
        expect(uuid).to.match(regex);
    });
    it("Should be version 4 uuid", () => {
        const uuid = generateUuidV4();
        const parts = uuid.split('-');

        // UUID is laid out into 5 parts separated by hyphens
        // 1. parts[0] is time_low
        // 2. parts[1] is time_mid
        // 3. parts[2] is time_hi_and_version
        // 4. parts[3] is clock_seq_hi_and_res clock_seq_low and
        // 5. parts[4] is node
        //
        // the version part should contain the hexadecimal digit 4;
        expect(parts[2]).to.satisfy((versionPart: string)=>versionPart.startsWith('4'));
    });
    it("Should be uuid with variant 1",()=>{
        const uuid = generateUuidV4();
        const parts = uuid.split('-');

        // the variant part should start with either 8 or 9 or a or b
        expect(parts[3]).to.satisfy((variantPart: string)=>variantPart.startsWith('8') || variantPart.startsWith('9') || variantPart.startsWith('a') || variantPart.startsWith('b'));
    });
    it("Should not generate same uuid subsequently",()=>{
        const uuid1 = generateUuidV4();
        const uuid2 = generateUuidV4();
        expect(uuid1).to.not.be.equal(uuid2);
    })
})