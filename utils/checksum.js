"use strict";

const crypto = require('crypto'),
      fs     = require('fs');

function checksum(str, algorithm, encoding) {
    return crypto.createHash(algorithm || 'md5').update(str, 'utf8').digest(encoding || 'hex')
}


class Checksum {

    static generateCheckSum(file) {
        var bufferFile = '';
        fs.readFile(file,function (err,data) {
            if(err) console.error(err);
            bufferFile = data;
        });;

        return checksum(bufferFile, 'sha1');
    }
    valideChecksum(checksum) {
        return this.checksum === checksum;
    }

}

module.exports = Checksum;