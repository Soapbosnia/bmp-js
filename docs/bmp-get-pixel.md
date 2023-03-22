# bmp-js / Documentation / bmp_get_pixel
## Introduction

### Description

Retrieve pixel RGBA value from X, Y coordinate of a resource

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||
|2|x|X axis||
|3|y|Y axis||

### Returns
`[R, G, B, A]`

## Code examples

```js
// Create a sample picture
var resource = bmp_create(10, 10);

// Place blue and red rectangles
bmp_plot_rect(resource, 0, 0, 5, 5, 111, 111, 111, true);
bmp_plot_rect(resource, 6, 6, 5, 5, 222, 222, 222, true);

// Get RGBA colors at [0, 0] and [6, 6] coordinates
var color_1 = bmp_get_pixel(resource, 0, 0);
var color_2 = bmp_get_pixel(resource, 6, 6);

// Print color data
console.log(color_1);
// Output: [111, 111, 111, 255]

console.log(color_2);
// Output: [222, 222, 222, 255]
```
