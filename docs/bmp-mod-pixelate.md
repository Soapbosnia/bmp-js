# bmp-js / Documentation / bmp_mod_pixelate
## Introduction

### Description

Pixelate an image

### Parameters

1. `resource` | `BMPJS Resource`
2. `factor` | `How much to divide image dimensions before upsampling (default 2, min 1)`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load image
var resource = bmp_request("docs/img/load/09.bmp");
    resource = bmp_create_from_bytes(resource);

// Pixelate images
var resource_2 = bmp_mod_pixelate(resource, 1);
var resource_3 = bmp_mod_pixelate(resource, 2);
var resource_4 = bmp_mod_pixelate(resource, 3);
var resource_5 = bmp_mod_pixelate(resource, 4);
var resource_6 = bmp_mod_pixelate(resource, 5);
var resource_7 = bmp_mod_pixelate(resource, 6);

// Spawn images
bmp_spawn(resource_2, container);
bmp_spawn(resource_3, container);
bmp_spawn(resource_4, container);
bmp_spawn(resource_5, container);
bmp_spawn(resource_6, container);
bmp_spawn(resource_7, container);
```

## Expected Result

![expected-result](./img/029.png)
