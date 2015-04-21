var mongoose = require('mongoose'),
    xxhash = require('xxhashjs'),
    s3 = require('./s3'),
    uuid = require('node-uuid').v4;

var blobSchema = mongoose.Schema({
  uuid: {
    type: String,
    index: {
      unique: true
    }
  },
  xxhash: {
    type: String,
    index: true
  },
  length: {
    type: Number,
    index: true
  },
  contentType: {
    type: String,
    default: "text/plain"
  }
});

blobSchema.static('setBlob', function (data, type, cb) {
  var hash = xxhash(data, 0).toString(16);
  var length = data.length;
  type = type || 'text/plain';

  if(type === 'application/x-www-form-urlencoded' || type === 'multipart/form-data') {
    type = 'text/plain';
  }

  this.findOne({
    xxhash: hash,
    length: length,
    contentType: type
  }, function (err, doc) {
    if(err) return cb(err);
    if(doc) return cb(null, doc.uuid);

    var id = uuid();

    s3.put(id, data, function (err) {
      if(err) return cb(err);

      this.create({
        uuid: id,
        xxhash: hash,
        length: length,
        contentType: type
      }, function (err, doc) {
        if(err) return cb(err);
        cb(null, doc.uuid);
      });

    }.bind(this));

  }.bind(this));
});

blobSchema.static('getBlob', function (id, cb) {
  this.findOne({
    uuid: id
  }, function (err, doc) {
    if(err) return cb(err);
    if(!doc) return cb();
    cb(null, s3.getStream(doc.uuid), doc.contentType, doc.length);
  });
});

var Blob = mongoose.model('Blob', blobSchema);

module.exports = Blob;
