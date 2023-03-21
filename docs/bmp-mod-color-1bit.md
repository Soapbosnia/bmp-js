# bmp-js / Documentation / bmp_mod_color_1bit
## Introduction

### Description

Convert an image to appear like a 1-bit image

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||

### Returns
`BMPJS Resource`

## Code examples

```js
// Load an example image
var resource_1 = bmp_load("docs/img/load/01.bmp");

// Convert resource_1 to 1-bit and store the new resource here
var resource_2 = bmp_mod_color_1bit(resource_1);

// Spawn the images into the container
bmp_spawn(resource_1, container);
bmp_spawn(resource_2, container);
```

## Expected Result

![expected-result](./img/011.png)
