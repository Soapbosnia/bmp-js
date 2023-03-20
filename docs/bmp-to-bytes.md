# bmp-js / Documentation / bmp_to_bytes

## Introduction

### Description

Converts `resource.bitmap` array into raw bytes and mutates `resource.bitmap_raw` property.

### Parameters

1. `resource` | `BMPJS Resource`

Returns: true `(boolean)`

### Notes

`resource` is passed by reference.

## Code examples

```js
// Create a 2x2 image
var resource = bmp_create(2, 2);

// Clear it using light blue
bmp_plot_clear(resource, 0, 255, 255);

console.log(bin2hex(resource.bitmap_raw));
// Output: null

bmp_to_bytes(resource);

console.log(bin2hex(resource.bitmap_raw));
// Output: ffff00ffff0000000000ffff00ff0000ff0000000000
```
