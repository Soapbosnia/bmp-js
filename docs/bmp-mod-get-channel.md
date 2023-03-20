# bmp-js / Documentation / bmp_mod_get_channel
## Introduction

### Description

Retrieve a specific color channel from a resource

### Parameters

1. `resource` | `BMPJS Resource`
2. `channel` | `Channel index (0 = Red, 1 = Green, 2 = Blue) (default 0)`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load an example image
var resource_bytes = bmp_request("docs/img/load/03.bmp");
var resource = bmp_create_from_bytes(resource_bytes);

// Extract all 3 channels
var resource_r = bmp_mod_get_channel(resource, 0);
var resource_g = bmp_mod_get_channel(resource, 1);
var resource_b = bmp_mod_get_channel(resource, 2);

// Spawn the images into the container
bmp_spawn(resource_r, container);
bmp_spawn(resource_g, container);
bmp_spawn(resource_b, container);
```

## Expected Result

![expected-result](./img/016.png)
