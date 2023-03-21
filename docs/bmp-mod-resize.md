# bmp-js / Documentation / bmp_mod_resize
## Introduction

### Description

Resize an image (using nearest neighbor)

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||
|2|w|Width (Rounded to nearest place)||
|3|h|Height (Rounded to nearest place)||

### Returns
`BMPJS Resource`

## Code examples

```js
// Load image
var resource = bmp_load("docs/img/load/01.bmp");

// Resize images
var resource_2 = bmp_mod_resize(resource, 240, 240);
var resource_3 = bmp_mod_resize(resource, 100, 200);
var resource_4 = bmp_mod_resize(resource, 200, 100);
var resource_5 = bmp_mod_resize(resource,  50, 100);

// Spawn images
bmp_spawn(resource_2, container);
bmp_spawn(resource_3, container);
bmp_spawn(resource_4, container);
bmp_spawn(resource_5, container);
```

## Expected Result

![expected-result](./img/030.png)
