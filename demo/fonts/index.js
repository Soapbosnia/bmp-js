// Copyright (C) 2022 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-09-19 08:11 PM
// Updated: 2022-11-12 05:30 PM

// FONT: 5x8
font_5x8_bytes = bmp_resource_request("../images/font/5x8/0.bmp");
resource_font_5x8 = bmp_resource_create_from_bytes(font_5x8_bytes);

// FONT: 6x14
font_6x14_bytes = bmp_resource_request("../images/font/6x14/0.bmp");
resource_font_6x14 = bmp_resource_create_from_bytes(font_6x14_bytes);

// FONT: 7x14
font_7x14_bytes = bmp_resource_request("../images/font/7x14/0.bmp");
resource_font_7x14 = bmp_resource_create_from_bytes(font_7x14_bytes);

// FONT: 8x16
font_8x16_bytes = bmp_resource_request("../images/font/8x16/0.bmp");
resource_font_8x16 = bmp_resource_create_from_bytes(font_8x16_bytes);

var w = 200;
var h = 200;

var resource = bmp_resource_create(w, h);

function draw_font(resource, resource_font, text) {
    var font_dim        = bmp_mod_dissect_font(resource_font);
    var font_length     = font_dim[0] * text.length;
    var resource_width  = resource.width;
    var resource_height = resource.height;
    var font_height     = font_dim[1];
    var text_pos_x      = (resource_width  / 2) - (font_length / 2);
    var text_pos_y      = (resource_height / 2) - (font_height / 2);

    bmp_plot_clear(resource, 40, 40, 40);
    bmp_plot_text(resource, resource_font, text_pos_x, text_pos_y, text, true);
    bmp_resource_spawn(resource, target_bmp_images);
}

draw_font(resource, resource_font_5x8,  "[ resource_font_5x8 ]");
draw_font(resource, resource_font_6x14, "[ resource_font_6x14 ]");
draw_font(resource, resource_font_7x14, "[ resource_font_7x14 ]");
draw_font(resource, resource_font_8x16, "[ resource_font_8x16 ]");
