# bmp-js / Documentation / bmp_size
## Introduction

### Description

Returns the image width and height for a BMPJS resource

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||

### Returns
`false` | `[width, height]`

## Code examples

```js
// Create a sample picture
var resource = bmp_create(240, 192);

// Get bitmap dimensions
var size = bmp_size(resource);

// Print the size
console.log(size);
// Output: [240, 192]
```
