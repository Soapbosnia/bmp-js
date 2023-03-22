# bmp-js / Documentation / bmp_to_canvas

## Introduction

### Description

Write `resource` bitmap to the `target` canvas context

\* This function should only be called by the internals of the library

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|canvas|Value pointing to a previous reference returned by bmp_spawn() that is an instance of HTMLCanvasElement||
|2|resource|BMPJS Resource||

### Returns
`false` | `true`

## Code examples

```js
// Create a 32 x 32 image
var resource = bmp_create(32, 32, true);
bmp_plot_clear(resource, 0, 128, 255);
bmp_plot_circle(resource, 4, 4, 24, 24, 255, 255, 255);

// Create a canvas prematurely
var reference = document.createElement("canvas");
reference.context = reference.getContext("2d");
reference.width = 32;
reference.height = 32;

document.body.append(reference);
bmp_to_canvas(reference, resource);
```

## Expected Result

![expected-result](./img/046.png)
