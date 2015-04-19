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
78e62f51-9241-4c06-a486-3f2b81b893dd
```

Get
---

Sample Request

```
curl http://immut.io/blobs/78e62f51-9241-4c06-a486-3f2b81b893dd
```

Expected Response

```
my blob
```

