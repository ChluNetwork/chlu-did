# Chlu DID Examples

## Chlu DID

```
{
  "@context": "https://w3id.org/did/v1",
  "id": "did:chlu:chlu",
  "publicKey": [{
    "id": "did:chlu:chlu#keys-1",
    "type": "RsaVerificationKey2018",
    "owner": "did:chlu:chlu",
    "publicKeyPem": "-----BEGIN PUBLIC KEY...END PUBLIC KEY-----\r\n"
  }],
  "authentication": [{
    "type": "RsaSignatureAuthentication2018",
    "publicKey": "did:chlu:chlu#keys-1"
  }]
}
```

## Vendor DID

```
{
  "@context": "https://w3id.org/did/v1",
  "id": "did:chlu:vendor-1",
  "publicKey": [{
    "id": "did:chlu:vendor-1#keys-1",
    "type": "RsaVerificationKey2018",
    "owner": "did:chlu:vendor-1",
    "publicKeyPem": "-----BEGIN PUBLIC KEY...END PUBLIC KEY-----\r\n"
  }],
  "authentication": [{
    "type": "RsaSignatureAuthentication2018",
    "publicKey": "did:chlu:vendor-1#keys-1"
  }]
}
```

## Review as a verifiable claim

```
{
  "id": "http://chlu.io/credentials/1",
  "type": ["Credential", "ProofOfAgeCredential"],
  "issuer": "https://marketplace.com/",
  "issued": "2018-04-28",
  "claim": {
    "id": "did:chlu:claim-1",
    "record": {
        {
            "buyable_type": "Gig",
            "review": "Great Job Iris. Thanks. We'll be back for more...",
            "created_at": "2018-04-27T04:30:07.000000Z",
            "updated_at": "2018-04-27T04:30:07.000000Z",
            "created_today": false,
            "id": 144119099,
            "is_seller": false,
            "order_id": 396427212,
            "photo_size": "user-pict-50",
            "rater_id": 19324832,
            "rater_image": "<img src="https://fiverr-res.cloudinary.com/t_profile_small,q_auto,f_auto/attachments/profile/photo/a6937ea59827a48c2b731a3f9c5492a6-1512552649995/862b58b7-d8b6-4d82-a14c-99f74ef0eeff.jpg"  alt="explainit"  width="60" height="60">",
            "rater_link": "/explainit",
            "rater_name": "Charith",
            "rater_username": "explainit",
            "user_id": 65746334,
            "valuation": {
                "question_1_id": 1,
                "question_1_value": 10,
                "question_2_id": 2,
                "question_2_value": 10,
                "question_3_id": 3,
                "question_3_value": 10
            },
            "value": 10
        },
    }
  },
  "proof": {
    "type": "RsaSignature2018",
    "created": "2018-04-28T21:19:10Z",
    "creator": "did:chlu:chlu",
    "nonce": "c0ae1c8e-c7e7-469f-b252-86e6a0e7387e",
    "signatureValue": "BavEll0/I1zpYw8XNi1bgVg/sCneO4Jugez8RwDg/+
      MCRVpjOboDoe4SxxKjkCOvKiCHGDvc4krqi6Z1n0UfqzxGfmatCuFibcC1wps
      PRdW+gGsutPTLzvueMWmFhwYmfIFpbBu95t501+rSLHIEuujM/+PXr9Cky6Ed
      +W3JT24="
  }
}
```
