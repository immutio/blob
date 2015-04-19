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
    index: {
      unique: true
    }
  },
  length: {
    type: Number,
    index: true
  },
  data: mongoose.Schema.Types.Buffer
});

blobSchema.static('setBlob', function (data, cb) {
  var hash = xxhash(data, 0).toString(16);
  var length = data.length;

  this.findOne({
    xxhash: hash,
    length: length
  }, function (err, doc) {
    if(err) return cb(err);
    if(doc) return cb(null, doc.uuid);

    this.create({
      uuid: uuid(),
      xxhash: hash,
      length: length,
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
    cb(null, doc.data);
  });
});

var Blob = mongoose.model('Blob', blobSchema);

module.exports = Blob;
