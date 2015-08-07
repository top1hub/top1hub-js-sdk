var request = require('request');
var fs = require('fs');
var utils = require('./lib/utils.js');
var async = require('async');
var querystring = require('querystring');
function ResourceManager(safeCode, container) {
    var self = this;
    self.isCover = false.toString();
    self.safeCode = safeCode;
    self.container = container;
}

ResourceManager.prototype.upload = function (fileKey, filePath, isCover, callback) {
    var self = this;
    if (typeof isCover === 'function') {
        callback = isCover;
    } else {
        self.isCover = isCover.toString();
    }
    function initToken(callback) {
        request.get('http://api.top1cloud.com/getuploadtoken?SafeCode=' + self.safeCode,
            function (err, res, body) {
                if (err || res.statusCode != 200) {
                    callback(new Error('Can not get token for uploading:'), null);
                    return;
                }
                var bodyObj = JSON.parse(body);
                self.token = bodyObj.message;
                callback(null, body);
            });
    }

    function doUpload() {
        var hashCode = utils.fileHash(filePath);
        var formData = {
            token: self.token,
            container: self.container,
            fileKey: fileKey,
            isCover: self.isCover,
            dataHash: hashCode,
            file: fs.createReadStream(filePath)
        };
        request.post({url: 'http://upload.top1cloud.com/upload', formData: formData}, function (err, res, body) {
            if (err || res.statusCode != 200) {
                callback(new Error('Can not upload file:'), null);
                return;
            }
            callback(null, body);
        });
    }

    async.series([initToken, doUpload], function (err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

ResourceManager.prototype.initToken =

    ResourceManager.prototype.delete = function (fileKey, callback) {
        var self = this;

        function initToken(callback) {
            request.get('http://api.top1cloud.com/getuploadtoken?SafeCode=' + self.safeCode,
                function (err, res, body) {
                    if (err || res.statusCode != 200) {
                        callback(new Error('Can not get token for uploading:'), null);
                        return;
                    }
                    var bodyObj = JSON.parse(body);
                    self.token = bodyObj.message;
                    callback(null, body);
                });
        }

        function doDelete() {
            var params = querystring.stringify({
                token: self.token,
                container: self.container,
                fileKey: fileKey
            });
            request.get('http://api.top1cloud.com/deletefile?' + params, function (err, res, body) {
                if (err || res.statusCode != 200) {
                    callback(new Error('Can not delete file:' + body), null);
                    return;
                }
                callback(null, body);
            })
        }

        async.series([initToken, doDelete], function (err, result) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    };

exports.ResourceManager = ResourceManager;