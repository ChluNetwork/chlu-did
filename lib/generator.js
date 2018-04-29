import constants from './constants'

class Generator {

  constructor() {
    this.env = {}
    this.env.nodejs = (typeof process !== 'undefined' &&
      process.versions && process.versions.node);
    if(!this.env.nodejs) {
      this.env.browser = true;
    }
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
        'publicKeyBase58': kp.publicKey,
      }],
      'authentication': [{
        'type': 'Ed25519SignatureAuthentication2018',
        'publicKey': `did:chlu:${kp.publicKey}#keys-1`,
      }]
    }
    let privateDidDocument = null;
    return {publicDidDocument, privateDidDocument}
  }

  async generateEd25519KeyPair() {
    if(this.env.nodejs) {
      const bs58 = require('bs58');
      const chloride = require('chloride');
      const keypair = chloride.crypto_sign_keypair();
      return {
        publicKey: bs58.encode(keypair.publicKey),
        privateKey: bs58.encode(keypair.secretKey)
      };
    }
    
    const forge = injector.use('forge');
    const keypair = forge.pki.ed25519.generateKeyPair();
    return {
      publicKey: forge.util.binary.base58.encode(keypair.publicKey),
      privateKey: forge.util.binary.base58.encode(keypair.privateKey)
    };
  };  
}

export default Generator
