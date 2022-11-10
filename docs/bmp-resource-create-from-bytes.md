# bmp-js / Documentation / bmp_resource_create_from_bytes

## Introduction

### Description

Decode raw Bitmap bytes to a BMPJS resource object

### Parameters

1. `bytes` | `Raw bytes of a valid BMP file`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load an image
var bmp_resource_bytes = bmp_resource_request("docs/img/load/2.bmp");

// Convert the raw bytes to a BMP resource object
var bmp_resource = bmp_resource_create_from_bytes(bmp_resource_bytes);

// Spawn the image into the container
bmp_resource_spawn(bmp_resource, bmp_container);
```

## Expected Result

![expected-result](./img/005.png)
