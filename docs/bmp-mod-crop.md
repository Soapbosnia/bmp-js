# bmp-js / Documentation / bmp_mod_crop
## Introduction

### Description

Crop an image.

In Mode 1, X1 and Y1 cannot be bigger than X2 and Y2 respectively.
X1 and Y1 define Point #1 on the image which is the starting point
and X2 and Y2 define Point #2 which is the ending point.
All values between those 2 points will be the returned resource
that contains the pixel data cropped within that area.

If X1 or Y1 are equal to their neighboring counterparts, then the
values of X2 or Y2 are increment by 1.
If X1 is 42 and X2 is 42 then X2 will be 43 as we cannot return
a cropped image if the 2 points fall on the same exact coordinate i.e.
we cannot have an image whose sides are 0.

Mode 2 overrides the resource_new width and height by treating
X2 and Y2 as the dimensions and not the 2nd point on the image.

In Mode 2, if the width or height exceed the boundary of the affectee resource
then the value that bmp_get_pixel() returns by default when out of bounds will
be written to the copy resource.

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||
|2|x1|Position X #1|0|
|3|y1|Position Y #1|0|
|4|x2|Position X #2 (Mode 2 uses it as width)|1|
|5|y2|Position Y #2 (Mode 2 uses it as height)|1|
|6|mode|If 1, values [x2, y2] are used as width and height of the returned resource|0|

### Returns
`BMPJS Resource`

## Code examples

```js
// Load an example image
var resource_1 = bmp_load("docs/img/load/02.bmp");

// Crop image using mode 1 and 2
var resource_2 = bmp_mod_crop(resource_1, 60, 60, 120, 120, 0); // Mode 1
var resource_3 = bmp_mod_crop(resource_1, 60, 60, 120, 120, 1); // Mode 2

// Crop image with coordinates out of bounds
var resource_4 = bmp_mod_crop(
    resource_1,
    resource_1.width  - 60,
    resource_1.height - 60,
    resource_1.width  + 50,
    resource_1.height + 50,
    0
);

var resource_5 = bmp_mod_crop(
    resource_1,
    resource_1.width  - 60,
    resource_1.height - 60,
    120,
    120,
    1
);

// Spawn the images into the container
bmp_spawn(resource_2, container);
bmp_spawn(resource_3, container);
bmp_spawn(resource_4, container);
bmp_spawn(resource_5, container);
```

## Expected Result

![expected-result](./img/027.png)

## Additional Information

![different-modes](./img/028.png)
