var Immutio = require('immutio-client'),
    fs = require('fs'),
    path = require('path'),
    index = fs.readFileSync(path.resolve(__dirname, '../views/index.md'), { encoding: 'utf-8' }),
    exec = require('child_process').exec,
    im = new Immutio();

im.store(index, function(err, id) {
  if(err) throw err;

  var url = "/blobs/" + id;

  exec("heroku config:set HOME_URL=\"" + url + "\" -a immut");
  console.log("HOME_URL set to " + url);
});
