var mongoose = require('mongoose'),
    uuid = require('node-uuid').v4;

var blobSchema = mongoose.Schema({
  uuid: {
    type: String,
    index: {
      unique: true
    }
  },
  data: mongoose.Schema.Types.Mixed
});

blobSchema.static('setBlob', function (data, cb) {
  var id = uuid();
  Blob.create({
    uuid: id,
    data: data
  }, function (err, doc) {
    if(err) return cb(err);
    cb(null, doc.uuid);
  });
});

blobSchema.static('getBlob', function (id, cb) {
  this.findOne({
    uuid: id
  }, function (err, doc) {
    if(err) return cb(err);
    cb(null, doc.data);
  });
});

var Blob = mongoose.model('Blob', blobSchema);

module.exports = Blob;
