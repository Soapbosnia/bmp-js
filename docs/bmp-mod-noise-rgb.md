# bmp-js / Documentation / bmp_mod_noise_rgb
## Introduction

### Description

Add RGB noise to an image

### Parameters

1. `resource` | `BMPJS Resource`
2. `scale` | `Amount of noise to add ranging from 0.0 to 10.0`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load an example image
var bmp_resource_bytes = bmp_request("docs/img/load/04.bmp");
var bmp_resource_1 = bmp_create_from_bytes(bmp_resource_bytes);

// Add noise with ranges of: 0.25, 0.50, 0.75, 1.00
var bmp_resource_2 = bmp_mod_noise_rgb(bmp_resource_1, 0.25);
var bmp_resource_3 = bmp_mod_noise_rgb(bmp_resource_1, 0.50);
var bmp_resource_4 = bmp_mod_noise_rgb(bmp_resource_1, 0.75);
var bmp_resource_5 = bmp_mod_noise_rgb(bmp_resource_1, 1.00);

// Spawn the images into the container
bmp_spawn(bmp_resource_2, bmp_container);
bmp_spawn(bmp_resource_3, bmp_container);
bmp_spawn(bmp_resource_4, bmp_container);
bmp_spawn(bmp_resource_5, bmp_container);
```

## Expected Result

![expected-result](./img/018.png)
