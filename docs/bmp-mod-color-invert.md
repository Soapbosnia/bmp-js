# bmp-js / Documentation / bmp_mod_color_invert
## Introduction

### Description

Invert colors of an image

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||

### Returns
`BMPJS Resource`

## Code examples

```js
// Load an example image
var resource_1 = bmp_load("docs/img/load/03.bmp");

// Convert resource_1 to inverted colors and store the new resource here
var resource_2 = bmp_mod_color_invert(resource_1);

// Spawn the images into the container
bmp_spawn(resource_1, container);
bmp_spawn(resource_2, container);
```

## Expected Result

![expected-result](./img/013.png)
