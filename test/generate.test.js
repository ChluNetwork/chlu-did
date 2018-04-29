import Generator from '../lib/generator'

test('generate key pair', () => {
  const generator = new Generator()
  const kp = generator.generateEd25519KeyPair()
  expect(kp).not.toBe(undefined)

  expect(kp.publicKey).not.toBe(null)
  expect(kp.privateKey).not.toBe(null)
});


test('generate a new did', () => {
  const generator = new Generator()
  const did = generator.generate()
  expect(did).not.toBe(undefined)

  expect(did.publicDidDocument).not.toBe(null)
  expect(did.privateDidDocument).toBe(null)
});
