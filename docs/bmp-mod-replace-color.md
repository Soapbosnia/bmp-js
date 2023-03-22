# bmp-js / Documentation / bmp_mod_replace_color
## Introduction

### Description

Replace a specific color in the image

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||
|2|pr|Color channel Red (parent)||
|3|pg|Color channel Green (parent)||
|4|pb|Color channel Blue (parent)||
|5|cr|Color channel Red (child)||
|6|cg|Color channel Green (child)||
|7|cb|Color channel Blue (child)||

### Returns
`BMPJS Resource`

## Code examples

```js
// Load an example image
var resource_1 = bmp_load("docs/img/load/05.bmp");

// Spawn the (before) image into the container
bmp_spawn(resource_1, container);

// Replace colors
resource_1 = bmp_mod_replace_color(resource_1,  28,  98, 183, 255,   0,   0);
resource_1 = bmp_mod_replace_color(resource_1, 192,   0,   0,   0, 255,   0);
resource_1 = bmp_mod_replace_color(resource_1,  23, 217, 211,   0,   0, 255);
resource_1 = bmp_mod_replace_color(resource_1, 255, 127,  39,   0, 255, 255);
resource_1 = bmp_mod_replace_color(resource_1, 190,  92,  20, 192, 192, 192);

// Spawn the (after) image into the container
bmp_spawn(resource_1, container);
```

## Expected Result

![expected-result](./img/019.png)
