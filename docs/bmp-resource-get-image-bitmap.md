# bmp-js / Documentation / bmp_resource_get_image_bitmap
## Introduction

### Description

Returns the bitmap from a BMPJS resource (if valid)

### Parameters

1. `resource` | `Reference to the resource created by bmp_resource_create()`

Returns: resource.bitmap `(uint8array)`

## Code examples

```js
// Create a sample picture
var bmp_resource = bmp_resource_create(2, 2);

// Clear the resource with Blue
bmp_plot_clear(bmp_resource, 64, 128, 255);

// Get the bitmap of this resource in uint8array format
var bmp_resource_bitmap = bmp_resource_get_image_bitmap(bmp_resource);

// Print the bitmap values
console.log( bmp_resource_bitmap.join(' ') );
// Output: 255 128 64 255 128 64 0 0 255 128 64 255 128 64 0 0
```
