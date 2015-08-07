var fs = require('fs');
var crypto = require('crypto');
function fileHash(filePath){
    var fileData = fs.readFileSync(filePath);
    var md5 = crypto.createHash('sha1');
    md5.update(fileData);
    var hashCode = md5.digest('hex');
    return hashCode;
}
exports.fileHash = fileHash;