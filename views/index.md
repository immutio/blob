immut.io
========
An Immutable Blob Store.

CLI
---

Install `im`

```
$ curl -sL immut.io/sh | sh
```

Upload a photo

```
$ im myPhoto.jpg
http://immut.io/blobs/c7c6df76-53f8-47ff-acfa-3bee20e895e8
```

Save the blob URL to your clipboard (on OS X)

```
$ im myPhoto.jpg | pbcopy
```

API
---

### Save a Blob

`POST` to `http://immut.io/blobs` with the blob as the request body.
immut.io will respond with status 200 with the relative url of the blob
in the response body.

Example cURL Request

```
$ curl --data "my blob" http://immut.io/blobs
/blobs/c7c6df76-53f8-47ff-acfa-3bee20e895e8
```

### Retrieve a Blob

`GET` from `http://immut.io/:id` with an optional `type` query parameter.
immut.io will respond with status 200 with the blob contents, transferred
with the `Content-Type` specified, defaulting to the `Content-Type` it
was originally uploaded with.

Example cURL Request

```
$ curl http://immut.io/blobs/c7c6df76-53f8-47ff-acfa-3bee20e895e8?type=text/plain
my blob
```


Uses
----
- [Pastebin](http://immut.io/paste)
- Do you have novel use for immut.io? Submit it to hello@immut.io


Client Libraries
----------------

- [Javascript](http://github.com/immutio/immutio-js-client)
- [PHP](http://github.com/turanct/immutio/) by [turanct](http://github.com/turanct)
- [Shell](http://github.com/immutio/immutio-sh-client)
- Have you written a client library? Submit it to hello@immut.io



Limits
------

1MB limit on all blobs, and limit of 1 POST request per second.

Need limits removed? contact hello@immut.io
