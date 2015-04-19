immut.io
========
Immutable Blob Store

Set
---

Sample Request

```
curl --data "my blob" http://immut.io/blobs
```

Expected Response

```
e071d37d-4a35-4969-96fb-9e97e49a6465
```

Get
---

Sample Request

```
curl http://immut.io/blobs/e071d37d-4a35-4969-96fb-9e97e49a6465
```

Expected Response

```
my blob
```

