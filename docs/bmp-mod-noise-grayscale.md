# bmp-js / Documentation / bmp_mod_noise_grayscale
## Introduction

### Description

Add grayscale noise to an image

### Parameters

1. `resource` | `BMPJS Resource`
2. `scale` | `Amount of noise to add ranging from 0.0 to 10.0`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load an example image
var resource_bytes = bmp_request("docs/img/load/04.bmp");
var resource_1 = bmp_create_from_bytes(resource_bytes);

// Add noise with ranges of: 0.25, 0.50, 0.75, 1.00
var resource_2 = bmp_mod_noise_grayscale(resource_1, 0.25);
var resource_3 = bmp_mod_noise_grayscale(resource_1, 0.50);
var resource_4 = bmp_mod_noise_grayscale(resource_1, 0.75);
var resource_5 = bmp_mod_noise_grayscale(resource_1, 1.00);

// Spawn the images into the container
bmp_spawn(resource_2, container);
bmp_spawn(resource_3, container);
bmp_spawn(resource_4, container);
bmp_spawn(resource_5, container);
```

## Expected Result

![expected-result](./img/017.png)
