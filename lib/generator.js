const constants = require('./constants')
const elliptic = require('elliptic')
const bs58 = require('bs58');
const brorand = require('brorand');

class Generator {

  constructor(ec) {
    this.ec = ec
    this.rand = brorand
  }
  
  async generate() {
    const kp = await this.generateEd25519KeyPair()
    const publicDidDocument = {
      '@context': constants.DID_CONTEXT,
      'id': `did:chlu:${kp.publicKey}`,
      'publicKey': [{
        'id': `did:chlu:${kp.publicKey}#keys-1`,
        'type': 'Ed25519VerificationKey2018',
        'owner': `did:chlu:${kp.publicKey}`,
        'publicKeyBase58': kp.publicKey
      }],
      'authentication': [{
        'type': 'Ed25519SignatureAuthentication2018',
        'publicKey': `did:chlu:${kp.publicKey}#keys-1`,
      }]
    }
    return {
      publicDidDocument,
      privateKeyBase58: kp.privateKey
    }
  }

  async generateEd25519KeyPair() {
    const keypair = this.ec.keyFromSecret(this.rand(128))
    return {
      publicKey: bs58.encode(Buffer.from(keypair.getPublic('hex'), 'hex')),
      privateKey: bs58.encode(Buffer.from(keypair.getSecret('hex'), 'hex'))
    };
  };
}

module.exports = Generator
