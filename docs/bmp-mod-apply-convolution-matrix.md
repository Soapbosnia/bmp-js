# bmp-js / Documentation / bmp_mod_apply_convolution_matrix
## Introduction

### Description

Apply a convolution matrix to an image.

More information about that here:

  - https://en.wikipedia.org/wiki/Kernel_(image_processing)
  - https://en.wikipedia.org/wiki/Convolution
  - https://docs.gimp.org/2.8/en/plug-in-convmatrix.html

### Parameters

1. `resource` | `BMPJS Resource`
2. `matrix` | `Convolution matrix (3x3 and 5x5 only)`
3. `divisor` | `How much to divide the average result (default 1)`
4. `offset` | `Value to add to the quotient (division result)`

Returns: BMPJS Resource `(object)`

## Code examples

```js
// Load image
var bmp_resource = bmp_request("docs/img/load/01.bmp");
    bmp_resource = bmp_create_from_bytes(bmp_resource);

// Apply effects
// Edge Detection #1
var bmp_resource_2 = bmp_mod_apply_convolution_matrix(
    bmp_resource,
    [
        1,  0, -1,
        0,  0,  0,
       -1,  0,  1
    ]
);

// Edge Detection #2
var bmp_resource_3 = bmp_mod_apply_convolution_matrix(
    bmp_resource,
    [
        0,  1,  0,
        1, -4,  1,
        0,  1,  0
    ]
);

// Edge Detection #3
var bmp_resource_4 = bmp_mod_apply_convolution_matrix(
    bmp_resource,
    [
       -1, -1, -1,
       -1,  8, -1,
       -1, -1, -1
    ]
);

// Box Blur
var bmp_resource_5 = bmp_mod_apply_convolution_matrix(
    bmp_resource,
    [
        1,  1,  1,
        1,  1,  1,
        1,  1,  1
    ],
    9
);

// Guassian Blur
var bmp_resource_6 = bmp_mod_apply_convolution_matrix(
    bmp_resource,
    [
        1,  2,  1,
        2,  4,  2,
        1,  2,  1
    ],
    16
);

// Emboss
var bmp_resource_7 = bmp_mod_apply_convolution_matrix(
    bmp_resource,
    [
       -2, -1,  0,
       -1,  1,  1,
        0,  1,  2
    ],
    9
);

// Spawn images
bmp_spawn(bmp_resource,   bmp_container);
bmp_spawn(bmp_resource_2, bmp_container);
bmp_spawn(bmp_resource_3, bmp_container);
bmp_spawn(bmp_resource_4, bmp_container);
bmp_spawn(bmp_resource_5, bmp_container);
bmp_spawn(bmp_resource_6, bmp_container);
bmp_spawn(bmp_resource_7, bmp_container);
```

## Expected Result

![expected-result](./img/032.png)
