# bmp-js / Documentation / bmp_mod_apply_convolution_matrix
## Introduction

### Description

Apply a convolution matrix to an image.

More information about that here:

  - https://en.wikipedia.org/wiki/Kernel_(image_processing)
  - https://en.wikipedia.org/wiki/Convolution
  - https://docs.gimp.org/2.8/en/plug-in-convmatrix.html

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||
|2|matrix|Convolution matrix (3x3 and 5x5 only)|[0, 0, 0, 0, 0, 0, 0, 0, 0]|
|3|divisor|How much to divide the average result|1|
|4|offset|Value to add to the quotient (division result)|0|

### Returns
`BMPJS Resource`

## Code examples

```js
// Load image
var resource_1 = bmp_load("docs/img/load/01.bmp");

// Resize the image for easier showcase
resource_1 = bmp_mod_resize(
    resource_1,
    resource_1.width  / 2,
    resource_1.height / 2
);

// Apply effects
// Edge Detection #1
var resource_2 = bmp_mod_apply_convolution_matrix(
    resource_1,
    [
        1,  0, -1,
        0,  0,  0,
       -1,  0,  1
    ]
);

// Edge Detection #2
var resource_3 = bmp_mod_apply_convolution_matrix(
    resource_1,
    [
        0,  1,  0,
        1, -4,  1,
        0,  1,  0
    ]
);

// Edge Detection #3
var resource_4 = bmp_mod_apply_convolution_matrix(
    resource_1,
    [
       -1, -1, -1,
       -1,  8, -1,
       -1, -1, -1
    ]
);

// Box Blur
var resource_5 = bmp_mod_apply_convolution_matrix(
    resource_1,
    [
        1,  1,  1,
        1,  1,  1,
        1,  1,  1
    ],
    9
);

// Emboss
var resource_6 = bmp_mod_apply_convolution_matrix(
    resource_1,
    [
       -2, -1,  0,
       -1,  1,  1,
        0,  1,  2
    ],
    9
);

// Spawn images
bmp_spawn(resource_1, container);
bmp_spawn(resource_2, container);
bmp_spawn(resource_3, container);
bmp_spawn(resource_4, container);
bmp_spawn(resource_5, container);
bmp_spawn(resource_6, container);
```

## Expected Result

![expected-result](./img/032.png)
