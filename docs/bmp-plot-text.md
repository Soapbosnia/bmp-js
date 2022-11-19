# bmp-js / Documentation / bmp_plot_resource
## Introduction

### Description

Use a loaded image resource that contains a character set range from 0x20 to 0x80 to plot text

### Parameters

1. `resource_p` | `BMPJS resource (parent)`
2. `resource_c` | `BMPJS resource (child)`
3. `x` | `Position X`
4. `y` | `Position Y`
5. `text` | `Input String`
6. `wrap` | `Does text wrap around (default true)`
7. `fr` | `Color channel Red (foreground)`
8. `fg` | `Color channel Green (foreground)`
9. `fb` | `Color channel Blue (foreground)`
10. `br` | `Color channel Red (background)`
11. `bg` | `Color channel Green (background)`
12. `bb` | `Color channel Blue (background)`

Returns: true `(boolean)`

## Code examples

```js
// Create image in which we'll plot text
var bmp_resource = bmp_resource_create(292, 100);

// Plot a rectangle in which we'll position the text
bmp_plot_rect(bmp_resource, 8, 8, 277, 84, 128, 128, 128);
bmp_plot_rect(bmp_resource, 9, 9, 275, 82,  32,  32,  32);

// Load font bitmaps
var font_1 = bmp_resource_request("demo/images/font/5x8/0.bmp");
    font_1 = bmp_resource_create_from_bytes(font_1);

var font_2 = bmp_resource_request("demo/images/font/6x14/0.bmp");
    font_2 = bmp_resource_create_from_bytes(font_2);

var font_3 = bmp_resource_request("demo/images/font/7x14/0.bmp");
    font_3 = bmp_resource_create_from_bytes(font_3);

var font_4 = bmp_resource_request("demo/images/font/8x16/0.bmp");
    font_4 = bmp_resource_create_from_bytes(font_4);

// Acquire information about fonts, their width and height
var font_1_props = bmp_mod_dissect_font(font_1);
var font_2_props = bmp_mod_dissect_font(font_2);
var font_3_props = bmp_mod_dissect_font(font_3);
var font_4_props = bmp_mod_dissect_font(font_4);

// Y offset that we'll use as we plot text
var x_offset = 10;
var y_offset = 10;

// Plot text (font_1)
bmp_plot_text(bmp_resource, font_1, x_offset, y_offset, "Font: 5x8");
y_offset += font_1_props[1];

bmp_plot_text(bmp_resource, font_1, x_offset, y_offset, "Font: 5x8", true, 255, 255, 255, 128,   0,   0);
y_offset += font_1_props[1];

bmp_plot_text(bmp_resource, font_1, x_offset, y_offset, "Font: 5x8", true, 255, 255, 255,   0, 128,   0);
y_offset += font_1_props[1];

bmp_plot_text(bmp_resource, font_1, x_offset, y_offset, "Font: 5x8", true, 255, 255, 255,   0,   0, 128);
y_offset += font_1_props[1];

bmp_plot_text(bmp_resource, font_1, x_offset, y_offset, "Font: 5x8", true,   0,   0,   0, 255, 255, 255);
x_offset += font_1_props[0] * ("Font: 5x8").length + font_1_props[0];
y_offset = 10;

// Plot text (font_2)
bmp_plot_text(bmp_resource, font_2, x_offset, y_offset, "Font: 6x14");
y_offset += font_2_props[1];

bmp_plot_text(bmp_resource, font_2, x_offset, y_offset, "Font: 6x14", true, 255, 255, 255, 128,   0,   0);
y_offset += font_2_props[1];

bmp_plot_text(bmp_resource, font_2, x_offset, y_offset, "Font: 6x14", true, 255, 255, 255,   0, 128,   0);
y_offset += font_2_props[1];

bmp_plot_text(bmp_resource, font_2, x_offset, y_offset, "Font: 6x14", true, 255, 255, 255,   0,   0, 128);
y_offset += font_2_props[1];

bmp_plot_text(bmp_resource, font_2, x_offset, y_offset, "Font: 6x14", true,   0,   0,   0, 255, 255, 255);
x_offset += font_2_props[0] * ("Font: 6x14").length + font_2_props[0];
y_offset = 10;

// Plot text (font_3)
bmp_plot_text(bmp_resource, font_3, x_offset, y_offset, "Font: 7x14");
y_offset += font_3_props[1];

bmp_plot_text(bmp_resource, font_3, x_offset, y_offset, "Font: 7x14", true, 255, 255, 255, 128,   0,   0);
y_offset += font_3_props[1];

bmp_plot_text(bmp_resource, font_3, x_offset, y_offset, "Font: 7x14", true, 255, 255, 255,   0, 128,   0);
y_offset += font_3_props[1];

bmp_plot_text(bmp_resource, font_3, x_offset, y_offset, "Font: 7x14", true, 255, 255, 255,   0,   0, 128);
y_offset += font_3_props[1];

bmp_plot_text(bmp_resource, font_3, x_offset, y_offset, "Font: 7x14", true,   0,   0,   0, 255, 255, 255);
x_offset += font_3_props[0] * ("Font: 7x14").length + font_3_props[0];
y_offset = 10;

// Plot text (font_4)
bmp_plot_text(bmp_resource, font_4, x_offset, y_offset, "Font: 8x16");
y_offset += font_4_props[1];

bmp_plot_text(bmp_resource, font_4, x_offset, y_offset, "Font: 8x16", true, 255, 255, 255, 128,   0,   0);
y_offset += font_4_props[1];

bmp_plot_text(bmp_resource, font_4, x_offset, y_offset, "Font: 8x16", true, 255, 255, 255,   0, 128,   0);
y_offset += font_4_props[1];

bmp_plot_text(bmp_resource, font_4, x_offset, y_offset, "Font: 8x16", true, 255, 255, 255,   0,   0, 128);
y_offset += font_4_props[1];

bmp_plot_text(bmp_resource, font_4, x_offset, y_offset, "Font: 8x16", true,   0,   0,   0, 255, 255, 255);
x_offset += font_4_props[0] * ("Font: 8x16").length + font_4_props[0];
y_offset = 10;

// Spawn the image into the container
bmp_resource_spawn(bmp_resource, bmp_container);
```

## Expected Result

![expected-result](./img/026.png)
