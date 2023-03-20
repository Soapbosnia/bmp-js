# bmp-js / Documentation / bmp_plot_resource
## Introduction

### Description

Copy the contents from a resource child to the resource parent

### Parameters

1. `resource_p` | `BMPJS resource (parent)`
2. `resource_c` | `BMPJS resource (child)`
3. `x` | `Position X`
4. `y` | `Position Y`
5. `w` | `Width (by default -1, child's width)`
6. `h` | `Height (by default -1, child's height)`
7. `ox` | `Offset to add to the X position of child`
8. `oy` | `Offset to add to the Y position of child`
9. `transparent` | `Handle tr, tg and tb colors as transparency`
10. `tr` | `Red channel to be used as transparency`
11. `tg` | `Green channel to be used as transparency`
12. `tb` | `Blue channel to be used as transparency`

Returns: true `(boolean)`

## Code examples

```js
// Create image in which we'll plot other images
var resource_1 = bmp_create(640, 480);

// Load other images
var resource_2 = bmp_request("docs/img/load/06.bmp");
    resource_2 = bmp_create_from_bytes(resource_2);

var resource_3 = bmp_request("docs/img/load/07.bmp");
    resource_3 = bmp_create_from_bytes(resource_3);

var resource_4 = bmp_request("docs/img/load/08.bmp");
    resource_4 = bmp_create_from_bytes(resource_4);

var resource_5 = bmp_request("docs/img/load/10.bmp");
    resource_5 = bmp_create_from_bytes(resource_5);

var resource_6 = bmp_request("docs/img/load/11.bmp");
    resource_6 = bmp_create_from_bytes(resource_6);

// Plot images
bmp_plot_resource(resource_1, resource_2, 15, 30);
bmp_plot_resource(resource_1, resource_3, 240, 70);
bmp_plot_resource(resource_1, resource_4, 350, 200);
bmp_plot_resource(resource_1, resource_5, 560, 16);

// Plot images with an offset
bmp_plot_resource(resource_1, resource_5, 16 * 2, 400, 16, 16, 16 * 0);
bmp_plot_resource(resource_1, resource_5, 16 * 4, 400, 16, 16, 16 * 1);
bmp_plot_resource(resource_1, resource_5, 16 * 6, 400, 16, 16, 16 * 2);
bmp_plot_resource(resource_1, resource_5, 16 * 8, 400, 16, 16, 16 * 3);

// Plot images with alpha-like properties
bmp_plot_resource(resource_1, resource_6, 100, 100, -1, -1, 0, 0, true, 255, 0, 255);
bmp_plot_resource(resource_1, resource_6, 130, 100, -1, -1, 0, 0);
bmp_plot_resource(resource_1, resource_6, 130, 175, -1, -1, 0, 0, true, 0, 0, 0);

// Spawn the image into the container
bmp_spawn(resource_1, container);
```

## Expected Result

![expected-result](./img/025.png)
