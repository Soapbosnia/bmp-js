# bmp-js / Documentation / bmp_plot_clear
## Introduction

### Description

Clear everything from the bitmap (by default using Black color)

### Parameters

1. `resource` | `BMPJS Resource`
2. `r` | `Color channel Red`
3. `g` | `Color channel Green`
4. `b` | `Color channel Blue`

Returns: true `(boolean)`

## Code examples

```js
// Create image
var bmp_resource = bmp_resource_create(32, 32);

// Spawn the image into the container after each clear operation
bmp_resource_spawn(bmp_resource, bmp_container);

bmp_plot_clear(bmp_resource, 192, 192, 192);
bmp_resource_spawn(bmp_resource, bmp_container);

bmp_plot_clear(bmp_resource, 255, 192,  64);
bmp_resource_spawn(bmp_resource, bmp_container);

bmp_plot_clear(bmp_resource,  64, 128,   0);
bmp_resource_spawn(bmp_resource, bmp_container);

bmp_plot_clear(bmp_resource,   0,  64,  24);
bmp_resource_spawn(bmp_resource, bmp_container);

bmp_plot_clear(bmp_resource, 128,   0, 128);
bmp_resource_spawn(bmp_resource, bmp_container);
```

## Expected Result

![expected-result](./img/022.png)
