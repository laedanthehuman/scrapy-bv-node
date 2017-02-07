"use strict";

const checksum = require('checksum');


class Checksum {

    static generateCheckSum(file) {
        return checksum(file,function (err,sum) {
            if (err) {
                throw new Error(err);
            }
            return sum;
        })
    }
    valideChecksum(checksum) {
        return this.checksum === checksum;
    }

}

module.exports = Checksum;
