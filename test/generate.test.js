import Generator from '../lib/generator'

test('generate a new did', () => {
  console.log(Generator)
  const generator = new Generator()
  const did = generator.generate()
  expect(did).not.toBe(undefined)

  expect(did.publicDidDocument).not.toBe(null)
  expect(did.privateDidDocument).toBe(null)
});
