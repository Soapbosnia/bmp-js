# bmp-js / Documentation / bmp_resource_create_from_bytes

## Introduction

### Description

Decode raw Bitmap bytes to a BMPJS resource object

### Parameters

1. `bytes` | `Raw bytes of a valid BMP file`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Create a 128 x 64 image
var bmp_resource = bmp_resource_create(128, 64);

// Spawn the image into the container
bmp_resource_spawn(bmp_resource, bmp_container);
```

## Expected Result

![expected-result](./img/003.png)
