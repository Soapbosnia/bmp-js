# bmp-js / Documentation / bmp_mod_emboss
## Introduction

### Description

Emboss

### Parameters

1. `resource` | `BMPJS Resource`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load image
var bmp_resource = bmp_request("docs/img/load/01.bmp");
    bmp_resource = bmp_create_from_bytes(bmp_resource);

// Emboss
var bmp_resource_2 = bmp_mod_emboss(bmp_resource, 0);

// Spawn images
bmp_spawn(bmp_resource,   bmp_container);
bmp_spawn(bmp_resource_2, bmp_container);
```

## Expected Result

![expected-result](./img/034.png)
