import Generator from '../lib/generator'

it('generates key pair', async () => {
  const generator = new Generator()
  const kp = await generator.generateEd25519KeyPair()

  expect(kp).not.toBe(undefined)  
  expect(kp.publicKey).not.toBe(null)
  expect(kp.privateKey).not.toBe(null)
})


it('generates a new did', async () => {

  const generator = new Generator()
  const did = await generator.generate()
  expect(did).not.toBe(undefined)
  
  expect(did.publicDidDocument).not.toBe(null)
  expect(did.privateDidDocument).toBe(null)
  
  expect(did.publicDidDocument['@context']).toBe('https://w3id.org/did/v1')
  expect(did.publicDidDocument.id).toEqual(expect.anything())
  expect(did.publicDidDocument.id).toEqual(expect.stringMatching(/did:chlu:.*/))
  expect(did.publicDidDocument.id).not.toEqual("did:chlu:undefined")
  expect(did.publicDidDocument.id).not.toEqual("did:chlu:null")
})
