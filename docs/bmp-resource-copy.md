# bmp-js / Documentation / bmp_resource_copy

## Introduction

### Description

Uses [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) to copy the resource object without reference.

### Parameters

1. `resource` | `BMPJS Resource`

Returns: BMPJS Resource | false `(object|boolean)`

## Code examples

```js
// Create a container element
var container = document.createElement("div");
container.id = "container";
document.body.appendChild(container);

// Create a 2x2 image
var resource1 = bmp_resource_create(32, 32);

// Clear it using light blue
bmp_plot_clear(resource1, 0, 255, 255);

// Copy the resource1 object into resource2
var resource2 = bmp_resource_copy(resource1);

// Clear it using bright red
bmp_plot_clear(resource2, 255, 0, 0);

// Spawn the images into the container
bmp_resource_spawn(resource1, container);
bmp_resource_spawn(resource2, container);
```

## Expected Result

![expected-result](./img/002.bmp)
