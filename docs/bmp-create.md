# bmp-js / Documentation / bmp_create

## Introduction

### Description

Create a BMP resource

### Parameters

1. `width` | `Width (X axis) of the image (non-zero)`
2. `height` | `Height (Y axis) of the image (non-zero)`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Create a 128 x 64 image
var resource = bmp_create(128, 64);

// Spawn the image into the container
bmp_spawn(resource, container);
```

## Expected Result

![expected-result](./img/003.png)
