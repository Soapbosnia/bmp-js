# bmp-js / Documentation / bmp_mod_rotate_left
## Introduction

### Description

Rotate the image to the left

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||

### Returns
`BMPJS Resource`

## Code examples

```js
// Load an example image
var resource_bytes = bmp_load("docs/img/load/02.bmp");

// Spawn the (before) image into the container
bmp_spawn(resource, container);

// Rotate left
resource = bmp_mod_rotate_left(resource);

// Spawn the (after) image into the container
bmp_spawn(resource, container);
```

## Expected Result

![expected-result](./img/020.png)
