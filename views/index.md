immut.io
========
An Immutable Blob Store.


Usage
-----

### Save a Blob

`POST` to `http://immut.io/blobs` with the blob as the request body.
Immut.io will respond with status 303 with the location of the saved blob.

cURL Request

```
curl --data "my blob" http://immut.io/blobs
```

cURL Response

```
See Other. Redirecting to /blobs/78e62f51-9241-4c06-a486-3f2b81b893dd
```

### Retrieve a Blob

`GET` from `http://immut.io/:sid` with an optional `type` query parameter.
Immut.io will respond with status 200 with the blob contents, transferred
with the `Content-Type` specified, defaulting to `text/plain`.

cURL Request

```
curl http://immut.io/blobs/78e62f51-9241-4c06-a486-3f2b81b893dd
```

cURL Response

```
my blob
```

Client Libraries
----------------

- [Official Javascript Client](http://github.com/immutio/node-immut.io-client)


Limits
------

1MB limit on all blobs.

Need more space or features? contact hello@immut.io
