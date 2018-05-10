const ChluDID = require('../src')
const expect = require('chai').expect

describe('DID signing', () => {

    it('can sign and verify data', async () => {
        const DID = new ChluDID()
        const did = await DID.generateDID() 
        const toSign = 'abcdef'
        const output = await DID.sign(did.privateKeyBase58, toSign)
        const valid = await DID.verify(did.publicDidDocument, output.data, output.signature)
        expect(valid).to.be.true
    })

})
