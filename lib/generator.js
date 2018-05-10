'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constants = require('./constants');
var elliptic = require('elliptic');
var bs58 = require('bs58');
var brorand = require('brorand');

var Generator = function () {
  function Generator(ec) {
    _classCallCheck(this, Generator);

    this.ec = ec;
    this.rand = brorand;
  }

  _createClass(Generator, [{
    key: 'generate',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var kp, publicDidDocument;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.generateEd25519KeyPair();

              case 2:
                kp = _context.sent;
                publicDidDocument = {
                  '@context': constants.DID_CONTEXT,
                  'id': 'did:chlu:' + kp.publicKey,
                  'publicKey': [{
                    'id': 'did:chlu:' + kp.publicKey + '#keys-1',
                    'type': 'Ed25519VerificationKey2018',
                    'owner': 'did:chlu:' + kp.publicKey,
                    'publicKeyBase58': kp.publicKey
                  }],
                  'authentication': [{
                    'type': 'Ed25519SignatureAuthentication2018',
                    'publicKey': 'did:chlu:' + kp.publicKey + '#keys-1'
                  }]
                };
                return _context.abrupt('return', {
                  publicDidDocument: publicDidDocument,
                  privateKeyBase58: kp.privateKey
                });

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function generate() {
        return _ref.apply(this, arguments);
      }

      return generate;
    }()
  }, {
    key: 'generateEd25519KeyPair',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var keypair;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                keypair = this.ec.keyFromSecret(this.rand(128));
                return _context2.abrupt('return', {
                  publicKey: bs58.encode(Buffer.from(keypair.getPublic('hex'), 'hex')),
                  privateKey: bs58.encode(Buffer.from(keypair.getSecret('hex'), 'hex'))
                });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function generateEd25519KeyPair() {
        return _ref2.apply(this, arguments);
      }

      return generateEd25519KeyPair;
    }()
  }]);

  return Generator;
}();

module.exports = Generator;