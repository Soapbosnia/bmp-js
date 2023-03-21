# bmp-js / Documentation / bmp_mod_blur_gaussian
## Introduction

### Description

Gaussian blur

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||
|2|max|How many times to call the convolution matrix function (min 1)|1|

### Returns
`BMPJS Resource`

## Code examples

```js
// Load image
var resource = bmp_load("docs/img/load/02.bmp");

// Resize the image for easier showcase
resource = bmp_mod_resize(
    resource,
    resource.width  / 2,
    resource.height / 2
);

// Spawn original image
bmp_spawn(resource, container);

for (let i = 1; i < 12; i++) {
    // Spawn blurred images
    var resource_tmp = bmp_mod_blur_gaussian(resource, i);
    bmp_spawn(resource_tmp, container);
}
```

## Expected Result

![expected-result](./img/035.png)
