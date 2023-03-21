# bmp-js / Documentation / bmp_mod_dissect_font
## Introduction

### Description

Request information about font dimensions (if the resource is a font)  
This will return incorrect results if called on a non-font resource

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||

### Returns
`[font_width, font_height, font_chars]`

## Code examples

```js
// Load all fonts available in BMPJS
var font_1 = bmp_load("demo/images/font/5x8/0.bmp");
var font_2 = bmp_load("demo/images/font/6x14/0.bmp");
var font_3 = bmp_load("demo/images/font/7x14/0.bmp");
var font_4 = bmp_load("demo/images/font/8x16/0.bmp");

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
