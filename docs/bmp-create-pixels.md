# bmp-js / Documentation / bmp_create_pixels
## Introduction

### Description

Creates an ImageData object containing RGBA values for the resource.

\* This function should only be called by the internals of the library.

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|width|Width (X axis) of the image (non-zero)||
|2|height|Height (Y axis) of the image (non-zero)||

### Returns
`false` | `ImageData`

## Code examples

```js
// Create pixels
var imagedata = bmp_create_pixels(1, 1);

console.log(imagedata);
// Output: ImageData {data: Uint8ClampedArray(4), width: 1, height: 1, colorSpace: 'srgb'}
```
