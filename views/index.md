immut.io
========
An Immutable Blob Store.


Usage
-----

### Save a Blob

`POST` to `http://immut.io/blobs` with the blob as the request body.
Immut.io will respond with status 200 with the relative url of the blob
in the response body.

Example cURL Request

```
curl --data "my blob" http://immut.io/blobs
```

Example cURL Response

```
/blobs/c7c6df76-53f8-47ff-acfa-3bee20e895e8
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


Uses
----
- [Pastebin](http://immut.io/paste)
- Do you have novel use for immut.io? Submit it to hello@immut.io


Client Libraries
----------------

- [Javascript Client](http://github.com/immutio/immutio-js-client)
- Have you written a client library? Submit it to hello@immut.io



Limits
------

1MB limit on all blobs, and limit of 1 POST request per second.

Need limits removed? contact hello@immut.io
