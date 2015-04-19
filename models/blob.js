var mongoose = require('mongoose'),
    xxhash = require('xxhashjs'),
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
  },
  data: mongoose.Schema.Types.Buffer
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

    this.create({
      uuid: uuid(),
      xxhash: hash,
      length: length,
      contentType: type,
      data: data
    }, function (err, doc) {
      if(err) return cb(err);
      cb(null, doc.uuid);
    });

  }.bind(this));
});

blobSchema.static('getBlob', function (id, cb) {
  this.findOne({
    uuid: id
  }, function (err, doc) {
    if(err) return cb(err);
    if(!doc) return cb();
    cb(null, doc.data, doc.contentType);
  });
});

var Blob = mongoose.model('Blob', blobSchema);

module.exports = Blob;
