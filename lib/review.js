'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jsonld = require('jsonld');
var jsig = require('jsonld-signatures');
jsig.use('jsonld', jsonld);

var Review = function () {
  function Review() {
    _classCallCheck(this, Review);
  }

  _createClass(Review, [{
    key: 'sign',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(issuerDID, subjectDID, review) {
        var privateKeyBase58, vc;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                privateKeyBase58 = issuerDID.publicKey[0].privateKeyBase58;
                vc = {
                  "@context": ['https://w3id.org/credentials/v1', 'http://schema.org/'],
                  subject: subjectDID.id,
                  issuer: issuerDID.id,
                  claim: review
                };
                return _context.abrupt('return', jsig.sign(vc, {
                  algorithm: 'Ed25519Signature2018',
                  subject: subjectDID.id,
                  privateKeyBase58: privateKeyBase58
                }));

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sign(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return sign;
    }()
  }, {
    key: 'verify',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(issuerDID, vc) {
        var publicKeyBase58;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                publicKeyBase58 = issuerDID.publicKey[0].publicKeyBase58;
                return _context2.abrupt('return', jsig.verify(vc, {
                  publicKeyBase58: publicKeyBase58,
                  checkTimestamp: false
                }));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function verify(_x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return verify;
    }()
  }]);

  return Review;
}();

module.exports = Review;