// Copyright (C) 2022 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-09-18 12:10 PM
// Updated: 2022-09-21 11:26 PM

var TimeA = time_precise();

// -----------------------------------------------------------------------------

var w = 100;
var h = 100;

var Image1 = bmp_resource_create(w, h);

for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
        bmp_resource_set_pixel(Image1, x, y, 0, 0, 0);

for (let y = 5; y < 5 + 10; y++)
    for (let x = 5; x < 5 + 10; x++)
        bmp_resource_set_pixel(Image1, x, y, 0, 50, 0);

bmp_resource_spawn(Image1, element_images_bmp);

for (let y = 5; y < 5 + 10; y++)
    for (let x = 85; x < 85 + 10; x++)
        bmp_resource_set_pixel(Image1, x, y, 0, 100, 0);

bmp_resource_spawn(Image1, element_images_bmp);

for (let y = 85; y < 85 + 10; y++)
    for (let x = 85; x < 85 + 10; x++)
        bmp_resource_set_pixel(Image1, x, y, 0, 150, 0);

bmp_resource_spawn(Image1, element_images_bmp);

for (let y = 85; y < 85 + 10; y++)
    for (let x = 5; x < 5 + 10; x++)
        bmp_resource_set_pixel(Image1, x, y, 0, 200, 0);

bmp_resource_spawn(Image1, element_images_bmp);

// -----------------------------------------------------------------------------

var TimeB = time_precise();

execution_time.innerText = "Execution took: " + (TimeB - TimeA) / 1000 + "s";

