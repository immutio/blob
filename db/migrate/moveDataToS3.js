var Blob = require('../../models/blob'),
    mongoose = require('../../mongoose'),
    s3 = require('../../models/s3'),
    async = require('async');

// upload all binary blobs to S3

Blob.find({ data: { '$exists': true } }, function (err, docs) {
  if(err) throw err;

  async.each(docs, function (doc, cb) {
    console.log(doc.uuid + " found, uploading to s3.");
    s3.put(doc.uuid, doc.data, function (err) {
      if(err) return cb(err);

      doc.data = undefined;
      console.log("deleting buffer for " + doc.uuid);
      doc.save(cb);
    });
  }, function (err) {
    if(err) throw err;

    console.log(docs.length + " blobs uploaded to s3, and data removed");
  });
});
