# bmp-js / Documentation / bmp_mod_detect_edge
## Introduction

### Description

Detect edges in an image

### Parameters

1. `resource` | `BMPJS Resource`
2. `mode` | `Available modes range from 0 to 2`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load image
var resource = bmp_request("docs/img/load/01.bmp");
    resource = bmp_create_from_bytes(resource);

// Detect edges
var resource_2 = bmp_mod_detect_edge(resource, 0); // Mode 0
var resource_3 = bmp_mod_detect_edge(resource, 1); // Mode 1
var resource_4 = bmp_mod_detect_edge(resource, 2); // Mode 2

// Spawn images
bmp_spawn(resource_2, container);
bmp_spawn(resource_3, container);
bmp_spawn(resource_4, container);
```

## Expected Result

![expected-result](./img/033.png)
