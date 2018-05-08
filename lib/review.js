var jsonld = require('jsonld');
var jsig = require('jsonld-signatures');
jsig.use('jsonld', jsonld);

class Review {

  async sign(issuerDID, subjectDID, review) {
    const privateKeyBase58 = issuerDID.publicKey[0].privateKeyBase58
    const vc = {
      "@context": [
        'https://w3id.org/credentials/v1',
        'http://schema.org/'
      ],
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

  async verify(issuerDID, vc) {
    const publicKeyBase58 = issuerDID.publicKey[0].publicKeyBase58
    return jsig.verify(vc, {
      publicKeyBase58,
      checkTimestamp: false
    })
  }
  
}


module.exports = Review
