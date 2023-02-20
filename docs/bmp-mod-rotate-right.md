# bmp-js / Documentation / bmp_mod_rotate_right
## Introduction

### Description

Rotate the image to the right

### Parameters

1. `resource` | `BMPJS Resource`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load an example image
var bmp_resource_bytes = bmp_resource_request("docs/img/load/02.bmp");
var bmp_resource = bmp_resource_create_from_bytes(bmp_resource_bytes);

// Spawn the (before) image into the container
bmp_resource_spawn(bmp_resource, bmp_container);

// Rotate right
bmp_resource = bmp_mod_rotate_right(bmp_resource);

// Spawn the (after) image into the container
bmp_resource_spawn(bmp_resource, bmp_container);
```

## Expected Result

![expected-result](./img/021.png)
