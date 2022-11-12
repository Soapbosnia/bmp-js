# bmp-js / Documentation / bmp_create_array_pixel
## Introduction

### Description

Creates a Uint8Array containing RGB values with the appropriate size

### Parameters

1. `width` | `Width (X axis) of the image (non-zero)`
2. `height` | `Height (Y axis) of the image (non-zero)`

Returns: `(uint8array)`

## Code examples

```js
// Valid image
var resource_valid   = bmp_resource_create(1, 1);
var resource_invalid = {};

console.log(bmp_resource_valid(resource_valid));
// Output: true

console.log(bmp_resource_valid(resource_invalid));
// Output: false
```
