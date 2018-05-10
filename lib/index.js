'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generator = require('./generator');
var bs58 = require('bs58');
var sha3 = require('js-sha3');
var elliptic = require('elliptic');

var ChluDID = function () {
    function ChluDID() {
        _classCallCheck(this, ChluDID);

        this.ec = new elliptic.eddsa('ed25519');
        this.generator = new Generator(this.ec);
    }

    _createClass(ChluDID, [{
        key: 'generateDID',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt('return', this.generator.generate());

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function generateDID() {
                return _ref.apply(this, arguments);
            }

            return generateDID;
        }()
    }, {
        key: 'sign',
        value: function sign(privateKeyBase58, data) {
            var keypair = this.ec.keyFromSecret(bs58.decode(privateKeyBase58));
            var hash = sha3.sha3_256.create().update(data).hex();
            return {
                signature: keypair.sign(hash).toHex(),
                data: data
            };
        }
    }, {
        key: 'verify',
        value: function verify(publicDidDocument, data, signature) {
            if (publicDidDocument && publicDidDocument.publicKey && publicDidDocument.publicKey[0] && publicDidDocument.publicKey[0].publicKeyBase58) {
                var publicKeyBase58 = publicDidDocument.publicKey[0].publicKeyBase58;
                // need to convert the buffer to bytearray with .toJSON().data for elliptic
                var keypair = this.ec.keyFromPublic(bs58.decode(publicKeyBase58).toJSON().data);
                var hash = sha3.sha3_256.create().update(data).hex();
                return keypair.verify(hash, signature);
            } else {
                throw new Error('No compatible public key found in DID Document');
            }
        }
    }]);

    return ChluDID;
}();

module.exports = ChluDID;