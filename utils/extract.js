"use strict";

const yauzl      = require('yauzl'),
      fs         = require('fs'),
      path       = require('path'),
      FileUtils  = require('./fileutils'),
      mkdirp     = require('mkdirp');
class ExtractUtils {

    static extractFile(file, output) {
        return new Promise(function(resolve, reject) {
            let entrys = [];

            yauzl.open(file, {
                lazyEntries: true
            }, function(err, zipfile) {
                if (err)
                    return reject(err);
                zipfile.readEntry();
                zipfile.on("entry", function(entry) {
                    entrys.push(output + path.sep + entry.fileName);
                    if (/\/$/.test(output + path.sep + entry.fileName)) {
                        // directory file names end with '/'
                        mkdirp(output + path.sep + entry.fileName, function(err) {
                            if (err)
                                return reject(err);
                            zipfile.readEntry();
                        });
                    } else {
                        // file entry
                        zipfile.openReadStream(entry, function(err, readStream) {
                            if (err)
                                return reject(err);

                            // ensure parent directory exists
                            mkdirp(path.dirname(output + path.sep + entry.fileName), function(err) {
                                if (err)
                                    return reject(err);
                                readStream.pipe(fs.createWriteStream(output + path.sep + entry.fileName));
                                readStream.on("end", function() {
                                    zipfile.readEntry();
                                });
                            });
                        });
                    }
                });
                zipfile.once("end", function() {
                    zipfile.close();
                    return resolve(entrys);
                });
            });
        });
    }
}

module.exports = ExtractUtils;