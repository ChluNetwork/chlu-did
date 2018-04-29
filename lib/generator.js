import constants from './constants'

class Generator {

  constructor() {
  }
  
  generate() {
    const publicDidDocument = {
      '@context': constants.DID_CONTEXT,
    };
    let privateDidDocument = null;
    return {publicDidDocument, privateDidDocument}
  }
  
}

export default Generator
