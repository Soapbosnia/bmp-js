# bmp-js / Documentation / bmp_replace
## Introduction

### Description

Replace the `resource` in the `target` element

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|target|Value pointing to a previous reference returned by `bmp_spawn()`|null|
|2|resource|BMPJS Resource||

### Returns
`false` | `true`

## Code examples

```js
// Create a sample picture
var resource_1 = bmp_create(32, 32);

// Clear the resource with a Dark Yellow color
bmp_plot_clear(resource_1, 128, 128, 0);

// Spawn the image into the container, but assign the
// return value to a spawn_reference variable
var spawn_reference = bmp_spawn(resource_1, container);

// Now let's create a different resource, with different dimensions and colors
var resource_2 = bmp_create(128, 64);

// Clear the resource with a Dark Blue color
bmp_plot_clear(resource_2, 0, 128, 128);

// Replace the spawned resource_1 with the resource_2
bmp_replace(spawn_reference, resource_2);
```

## Expected Result

![expected-result](./img/009.png)
