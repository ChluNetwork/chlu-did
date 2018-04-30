import Review from '../lib/review'

const chluDID = {"@context":"https://w3id.org/did/v1","id":"did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU","publicKey":[{"id":"did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU#keys-1","type":"Ed25519VerificationKey2018","owner":"did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU","publicKeyBase58":"B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU","privateKeyBase58":"28dDPywX1z4Sv7ksWthdh6yGN6ua42YER34mN5Q3dLqosLEH4L3s5HSvRtdEDqNsvU33Ug84gfkJpHpTUZyga7bx"}],"authentication":[{"type":"Ed25519SignatureAuthentication2018","publicKey":"did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU#keys-1"}]}

const vendorDID = {"@context":"https://w3id.org/did/v1","id":"did:chlu:GuhduVevhGzwc8DtyNQWoUUQvSWcAZrTuNqNL9bG7XfY","publicKey":[{"id":"did:chlu:GuhduVevhGzwc8DtyNQWoUUQvSWcAZrTuNqNL9bG7XfY#keys-1","type":"Ed25519VerificationKey2018","owner":"did:chlu:GuhduVevhGzwc8DtyNQWoUUQvSWcAZrTuNqNL9bG7XfY","publicKeyBase58":"GuhduVevhGzwc8DtyNQWoUUQvSWcAZrTuNqNL9bG7XfY","privateKeyBase58":"4sGHzpG5th38v4WhaShoXRKaDvN3vtXgXqQjCwcqs19xetAhkbabBitKFPPgZnrGESQaQrfdeTbqZjbzh7C6sZaS"}],"authentication":[{"type":"Ed25519SignatureAuthentication2018","publicKey":"did:chlu:GuhduVevhGzwc8DtyNQWoUUQvSWcAZrTuNqNL9bG7XfY#keys-1"}]}

fit('Signs a review, returning a verifiable claim', async () => {
  const review = {
    review: 'Sample review text',
    rating: 4
  }
{
  "id": "http://chlu.io/credentials/1",
  "type": ["Credential"],
  "issuer": "https://dmv.example.gov",
  "issued": "2010-01-01",
  "claim": {
    "id": "did:ebfeb1f712ebc6f1c276e12ec21",
    "ageOver": 21
  }
}
  const vc = new Review().sign(chluDID, vendorDID, review)

  expect(vc).not.toBe(undefined)
})
