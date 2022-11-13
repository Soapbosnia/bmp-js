# bmp-js / Documentation / bmp_resource_get_image_size
## Introduction

### Description

Returns the image width and height for a BMPJS resource

### Parameters

1. `resource` | `BMPJS Resource`

Returns: [width, height] `(array)`

## Code examples

```js
// Create a sample picture
var bmp_resource = bmp_resource_create(240, 192);

// Get bitmap dimensions
var bmp_resource_dims = bmp_resource_get_image_size(bmp_resource);

// Print the data
console.log(bmp_resource_dims);
// Output: [240, 192]
```
