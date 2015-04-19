immut.io
========
An Immutable Blob Store.


Usage
-----

### Save a Blob

`POST` to `http://immut.io/blobs` with the blob as the request body.
Immut.io will respond with status 303 with the url of the blob in the
`Location` header.

Example cURL Request

```
curl --data "my blob" http://immut.io/blobs
```

Example cURL Response

```
See Other. Redirecting to /blobs/c7c6df76-53f8-47ff-acfa-3bee20e895e8
```

### Retrieve a Blob

`GET` from `http://immut.io/:id` with an optional `type` query parameter.
Immut.io will respond with status 200 with the blob contents, transferred
with the `Content-Type` specified, defaulting to the `Content-Type` it
was originally uploaded with.

Example cURL Request

```
curl http://immut.io/blobs/c7c6df76-53f8-47ff-acfa-3bee20e895e8?type=text/plain
```

Example cURL Response

```
my blob
```


Client Libraries
----------------

- [Javascript Client](http://github.com/immutio/immutio-js-client)



Limits
------

1MB limit on all blobs.

Need more space or features? contact hello@immut.io
