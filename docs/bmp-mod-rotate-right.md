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
var resource_bytes = bmp_request("docs/img/load/02.bmp");
var resource = bmp_create_from_bytes(resource_bytes);

// Spawn the (before) image into the container
bmp_spawn(resource, container);

// Rotate right
resource = bmp_mod_rotate_right(resource);

// Spawn the (after) image into the container
bmp_spawn(resource, container);
```

## Expected Result

![expected-result](./img/021.png)
