# bmp-js / Documentation / bmp_mod_emboss
## Introduction

### Description

Emboss

### Parameters

1. `resource` | `BMPJS Resource`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load image
var resource = bmp_request("docs/img/load/01.bmp");
    resource = bmp_create_from_bytes(resource);

// Emboss
var resource_2 = bmp_mod_emboss(resource, 0);

// Spawn images
bmp_spawn(resource,   container);
bmp_spawn(resource_2, container);
```

## Expected Result

![expected-result](./img/034.png)
