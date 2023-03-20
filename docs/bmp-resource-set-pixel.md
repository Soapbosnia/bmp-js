# bmp-js / Documentation / bmp_set_pixel
## Introduction

### Description

Set pixel RGB value at X, Y coordinate of a resource

### Parameters

1. `resource` | `BMPJS Resource`
2. `x` | `X axis`
3. `y` | `Y axis`
4. `r` | `Color channel Red`
5. `g` | `Color channel Green`
6. `b` | `Color channel Blue`

Returns: true `(boolean)`

## Code examples

```js
// Create a sample picture
var bmp_resource = bmp_create(10, 10);

// Place blue and red pixels at [2, 2] and [7, 7] coordinates
bmp_set_pixel(bmp_resource, 2, 2,   0, 255, 255);
bmp_set_pixel(bmp_resource, 7, 7, 255,   0,   0);

// Spawn the image into the container
bmp_spawn(bmp_resource, bmp_container);
```

## Expected Result (10x zoom)

![expected-result](./img/008.png)
