# bmp-js / Documentation / bmp_mod_sharpen
## Introduction

### Description

Sharpen an image

### Parameters

1. `resource` | `BMPJS Resource`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load image
var bmp_resource = bmp_resource_request("docs/img/load/1.bmp");
    bmp_resource = bmp_resource_create_from_bytes(bmp_resource);

// Sharpen images
var bmp_resource_2 = bmp_mod_sharpen(bmp_resource);

// Spawn images
bmp_resource_spawn(bmp_resource,   bmp_container);
bmp_resource_spawn(bmp_resource_2, bmp_container);
```

## Expected Result

![expected-result](./img/031.png)
