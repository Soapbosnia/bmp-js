# bmp-js / Documentation / bmp_get_pixel
## Introduction

### Description

Retrieve pixel RGB value from X, Y coordinate of a resource

### Parameters

1. `resource` | `BMPJS Resource`
2. `x` | `X axis`
3. `y` | `Y axis`

Returns: [R, G, B] `(array)`

## Code examples

```js
// Create a sample picture
var bmp_resource = bmp_create(10, 10);

// Place blue and red rectangles
bmp_plot_rect(bmp_resource, 0, 0, 5, 5, 111, 111, 111);
bmp_plot_rect(bmp_resource, 6, 6, 5, 5, 222, 222, 222);

// Get RGB colors at [0, 0] and [6, 6] coordinates
var color_1 = bmp_get_pixel(bmp_resource, 0, 0);
var color_2 = bmp_get_pixel(bmp_resource, 6, 6);

// Print color data
console.log(color_1);
// Output: [111, 111, 111]

console.log(color_2);
// Output: [222, 222, 222]
```
