var AWS = require('aws-sdk'),
    bucket = "immut.io";

function key(id) {
  return "blobs/" + id;
}

exports.put = function (id, buf, callback) {
  var s3 = new AWS.S3({ params: { Bucket: bucket, Key: key(id) } });
  s3.upload({ Body: buf }, callback);
};

exports.getStream = function (id) {
  var s3 = new AWS.S3();
  return s3.getObject({ Bucket: bucket, Key: key(id) }).createReadStream();
};
