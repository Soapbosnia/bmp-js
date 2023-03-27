# bmp-js / Documentation / bmp_copy
## Introduction

### Description

Uses [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) to copy the resource object without reference.

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||

### Returns
`BMPJS Resource`

## Code examples

```js
// Create a 32 x 32 image
var resource_1 = bmp_create(32, 32);

// Clear it using light blue
bmp_plot_clear(resource_1, 0, 255, 255);

// Copy the resource1 object into resource2
var resource_2 = bmp_copy(resource_1);

// Clear it using bright red
bmp_plot_clear(resource_2, 255, 0, 0);

// Spawn the images into the container
bmp_spawn(resource_1, container);
bmp_spawn(resource_2, container);
```

## Expected Result

![expected-result](./img/002.png)
