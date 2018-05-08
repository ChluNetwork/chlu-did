const Generator = require('./generator');
const bs58 = require('bs58');
const sha3 = require('js-sha3')
const elliptic = require('elliptic')

class ChluDID {
    constructor() {
        this.ec = new elliptic.eddsa('ed25519')
        this.generator = new Generator(this.ec)
    }

    async generateDID() {
        return this.generator.generate()
    }

    sign(privateKeyBase58, data) {
        const keypair = this.ec.keyFromSecret(bs58.decode(privateKeyBase58))
        const hash = sha3.sha_256.create().update(data).hex()
        return {
            signature: keypair.sign(hash).toHex(),
            data
        }
    }

    verify(publicDidDocument, data, signature) {
        if (publicDidDocument && publicDidDocument.publicKey && publicDidDocument.publicKey[0] && publicDidDocument.publicKey[0].publicKeyBase58) {
            const publicKeyBase58 = publicDidDocument.publicKey[0].publicKeyBase5
            const keypair = this.ec.keyFromPublic(bs58.decode(publicKeyBase58))
            const hash = sha3.sha_256.create().update(data).hex()
            return keypair.verify(hash, signature)
        } else {
            throw new Error('No compatible public key found in DID Document')
        }
    }
}

module.exports = ChluDID