# bmp-js / Documentation / bmp_mod_blur_box
## Introduction

### Description

Box blur

### Parameters

1. `resource` | `BMPJS Resource`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load image
var resource = bmp_request("docs/img/load/02.bmp");
    resource = bmp_create_from_bytes(resource);

// Blur
var resource_2 = bmp_mod_blur_box(resource);
var resource_3 = bmp_mod_blur_box(resource_2);
var resource_4 = bmp_mod_blur_box(resource_3);
var resource_5 = bmp_mod_blur_box(resource_4);
var resource_6 = bmp_mod_blur_box(resource_5);

// Spawn images
bmp_spawn(resource,   container);
bmp_spawn(resource_2, container);
bmp_spawn(resource_3, container);
bmp_spawn(resource_4, container);
bmp_spawn(resource_5, container);
bmp_spawn(resource_6, container);
```

## Expected Result

![expected-result](./img/036.png)
