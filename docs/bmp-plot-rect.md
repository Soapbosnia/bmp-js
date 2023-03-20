# bmp-js / Documentation / bmp_plot_rect
## Introduction

### Description

Plot a rectangle

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||
|2|x|Position X|0|
|3|y|Position Y|0|
|4|w|Width|10|
|5|h|Height|10|
|6|r|Color channel Red|255|
|7|g|Color channel Green|255|
|8|b|Color channel Blue|255|
|9|fill|Fill the area with color|false|

Returns: true `(boolean)`

## Code examples

```js
// Create image
var resource = bmp_create(128, 128);

// Plot some rectangles
bmp_plot_rect(resource, 12, 12, 38, 48, 255,   0,   0);
bmp_plot_rect(resource, 46, 21, 62, 32, 255, 255,   0);
bmp_plot_rect(resource, 15, 56, 63, 52,   0, 128,   0);
bmp_plot_rect(resource, 67, 53, 45, 41,   0, 128, 255);
bmp_plot_rect(resource, 41, 41, 38, 29, 255, 255, 255);

// Spawn the image into the container
bmp_spawn(resource, container);
```

## Expected Result

![expected-result](./img/024.png)
