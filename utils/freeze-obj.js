exports.freezeObject = function (object) {
    const RealImmutable = require('iammutable')(object);
    return RealImmutable;
};