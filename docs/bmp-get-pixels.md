# bmp-js / Documentation / bmp_get_pixels
## Introduction

### Description

Returns the bitmap from a BMPJS resource (if valid)

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||

### Returns
`Uint8ClampedArray`

## Code examples

```js
// Create a sample picture
var resource = bmp_create(2, 2);

// Clear the resource with Blue
bmp_plot_clear(resource, 34, 121, 255);

// Get the pixels of this resource in Uint8ClampedArray format
var pixels = bmp_get_pixels(resource);

// Print the pixel values
console.log( pixels.join(' ') );
// Output: 255 121 34 255 255 121 34 255 255 121 34 255 255 121 34 255
```
