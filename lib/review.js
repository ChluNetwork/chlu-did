var jsonld = require('jsonld');
var jsig = require('jsonld-signatures');
jsig.use('jsonld', jsonld);

class Review {

  async sign(issuerDID, subjectDID, review) {
    const privateKeyBase58 = issuerDID.publicKey[0].privateKeyBase58
    const vc = {
      "@context": ["https://w3id.org/credentials/v1",
                   'http://schema.org/'],
      subject: subjectDID.id,
      issuer: issuerDID.id,
      claim: review
    }
    return jsig.sign(vc, {
      algorithm: 'Ed25519Signature2018',
      subject: subjectDID.id,
      privateKeyBase58,
    })
  }
  
}


export default Review
