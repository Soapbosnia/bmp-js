# bmp-js / Documentation / bmp_mod_dissect_font
## Introduction

### Description

Request information about font dimensions (if the resource is a font). This will return incorrect results if called on a non-font resource

### Parameters

1. `resource` | `BMPJS Resource`

Returns: [font_width, font_height, font_chars] `(array)`

## Code examples

```js
// Load all fonts available in BMPJS
var font_1 = bmp_request("demo/images/font/5x8/0.bmp");
var font_2 = bmp_request("demo/images/font/6x14/0.bmp");
var font_3 = bmp_request("demo/images/font/7x14/0.bmp");
var font_4 = bmp_request("demo/images/font/8x16/0.bmp");

font_1 = bmp_create_from_bytes(font_1);
font_2 = bmp_create_from_bytes(font_2);
font_3 = bmp_create_from_bytes(font_3);
font_4 = bmp_create_from_bytes(font_4);

// Generate information about fonts based on dimensions
var font_1_props = bmp_mod_dissect_font(font_1);
var font_2_props = bmp_mod_dissect_font(font_2);
var font_3_props = bmp_mod_dissect_font(font_3);
var font_4_props = bmp_mod_dissect_font(font_4);

console.log(font_1_props);
// Output: [5,  8, 96]

console.log(font_2_props);
// Output: [6, 14, 96]

console.log(font_3_props);
// Output: [7, 14, 96]

console.log(font_4_props);
// Output: [8, 16, 96]
```
