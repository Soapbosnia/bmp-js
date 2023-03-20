# bmp-js / Documentation / bmp_copy

## Introduction

### Description

Uses [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) to copy the resource object without reference.

### Parameters

1. `resource` | `BMPJS Resource`

Returns: BMPJS Resource | false `(object|boolean)`

## Code examples

```js
// Create a 32 x 32 image
var bmp_resource_1 = bmp_create(32, 32);

// Clear it using light blue
bmp_plot_clear(bmp_resource_1, 0, 255, 255);

// Copy the resource1 object into resource2
var bmp_resource_2 = bmp_copy(bmp_resource_1);

// Clear it using bright red
bmp_plot_clear(bmp_resource_2, 255, 0, 0);

// Spawn the images into the container
bmp_spawn(bmp_resource_1, bmp_container);
bmp_spawn(bmp_resource_2, bmp_container);
```

## Expected Result

![expected-result](./img/002.png)
