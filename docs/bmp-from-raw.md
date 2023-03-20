# bmp-js / Documentation / bmp_from_raw

## Introduction

### Description

Decode raw Bitmap bytes to a BMPJS resource object

### Parameters

1. `bytes` | `Raw bytes of a valid BMP file`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load an image
var bytes = bmp_request("docs/img/load/02.bmp");

// Convert the raw bytes to a BMP resource object
var resource = bmp_from_raw(bytes);

// Spawn the image into the container
bmp_spawn(resource, container);
```

## Expected Result

![expected-result](./img/005.png)
