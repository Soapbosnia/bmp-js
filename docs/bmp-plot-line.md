# bmp-js / Documentation / bmp_plot_line
## Introduction

### Description

Plot a line from point A to B

### Parameters

1. `resource` | `BMPJS Resource`
2. `x1` | `Position X #1`
3. `y1` | `Position Y #1`
4. `x2` | `Position X #2`
5. `y2` | `Position Y #2`
6. `r` | `Color channel Red`
7. `g` | `Color channel Green`
8. `b` | `Color channel Blue`
9. `p` | `Precision of line (clamped from 0.1 to 2)`

Returns: true `(boolean)`

## Code examples

```js
// Initialization
var image_width, image_width_original = 256;
var image_height, image_height_original = 256;
var star_color = [255, 0, 0];

// You may define a custom width and height here
image_width = 96;
image_height = 96;

// This calculates the scale relative to the original size
var scale_width = image_width / image_width_original;
var scale_height = image_height / image_height_original;

// Create image
var resource_1 = bmp_create(image_width, image_height);
var resource_2 = bmp_create(image_width, image_height);
var resource_3 = bmp_create(image_width, image_height);
var resource_4 = bmp_create(image_width, image_height);
var resource_5 = bmp_create(image_width, image_height);

// Star points
var points = [
    [129,  33, 151, 106],
    [151, 106, 224, 107],
    [224, 107, 167, 151],
    [167, 151, 188, 224],
    [188, 224, 129, 182],
    [129, 182,  69, 224],
    [ 69, 224,  90, 151],
    [ 90, 151,  33, 107],
    [ 33, 107, 106, 106],
    [106, 106, 129,  33]
];

// Plot the points with multiple precisions
for (let i = 0, j = points.length; i < j; i++) {
    var p = points[i];
    
    // Define points and scale them correctly    
    var p0 = p[0] * scale_width;
    var p1 = p[1] * scale_height;
    var p2 = p[2] * scale_width;
    var p3 = p[3] * scale_height;

    var c = star_color;

    // Plot the points
    bmp_plot_line(resource_1, p0, p1, p2, p3, c[0], c[1], c[2], 0.2);
    bmp_plot_line(resource_2, p0, p1, p2, p3, c[0], c[1], c[2], 0.4);
    bmp_plot_line(resource_3, p0, p1, p2, p3, c[0], c[1], c[2], 0.6);
    bmp_plot_line(resource_4, p0, p1, p2, p3, c[0], c[1], c[2], 0.8);
    bmp_plot_line(resource_5, p0, p1, p2, p3, c[0], c[1], c[2], 1.0);
}

// Spawn the images into the container
bmp_spawn(resource_1, container);
bmp_spawn(resource_2, container);
bmp_spawn(resource_3, container);
bmp_spawn(resource_4, container);
bmp_spawn(resource_5, container);
```

## Expected Result

![expected-result](./img/023.png)
