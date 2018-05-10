const Generator = require('../src/generator')
const elliptic = require('elliptic')
const expect = require('chai').expect

describe('Generator', () => {

  let ec

  before(() => {
    ec = new elliptic.eddsa('ed25519')
  })

  it('generates key pair', async () => {
    const generator = new Generator(ec)
    const kp = await generator.generateEd25519KeyPair()

    expect(kp.publicKey).to.be.a('string')
    expect(kp.privateKey).to.be.a('string')
  })


  it('generates a new did', async () => {

    const generator = new Generator(ec)
    const did = await generator.generate()
    expect(did).not.to.be.undefined

    //expect(did.privateDidDocument).not.to.be.undefined
    
    expect(did.publicDidDocument['@context']).to.equal('https://w3id.org/did/v1')

    expect(did.publicDidDocument.id).to.match(/^did:chlu:/)
    expect(did.publicDidDocument.id).not.to.equal("did:chlu:undefined")
    expect(did.publicDidDocument.id).not.to.equal("did:chlu:null")

    const publicKeyBase58 = did.publicDidDocument.id.split(':')[2]
    expect(did.publicDidDocument.publicKey[0].id).to.equal(`${did.publicDidDocument.id}#keys-1`)
    expect(did.publicDidDocument.publicKey[0].type).to.equal("Ed25519VerificationKey2018")
    expect(did.publicDidDocument.publicKey[0].owner).to.equal(`${did.publicDidDocument.id}`)
    expect(did.publicDidDocument.publicKey[0].publicKeyBase58).to.equal(publicKeyBase58)

    expect(did.publicDidDocument.authentication[0].publicKey).to.equal(`did:chlu:${publicKeyBase58}#keys-1`)
  })
})
