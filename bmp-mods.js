//
// Copyright (C) 2022 Nurudin Imsirovic <github.com/oxou>
//
// Bitmap Image Encoder/Decoder - Mods
// https://www.github.com/oxou/bmp-js
//
// This file is a part of bmp.js but its contents are contained separately.
//
// Adds extra functionality for manipulating BMPJS resources.
//
// Created: 2022-09-28 06:42 PM
// Updated: 2022-10-09 12:01 AM
//

/**
 * Retrieve a specific color channel from a resource
 *
 * @param resource BMPJS Resource
 * @param channel  Channel index (0 = Red, 1 = Green, 2 = Blue) (default 0)
 * @return         BMPJS Resource
 */
function bmp_mod_get_channel(resource, channel = 0) {
    channel = clamp(channel, 0, 2);
    var resource_new = bmp_resource_create(resource.width, resource.height);

    for (let y = 0; y < resource.height; y++)
        for (let x = 0; x < resource.width; x++) {
            var color = bmp_resource_get_pixel(resource, x, y);
            bmp_resource_set_pixel(
                resource_new,
                x,
                y,
                color[channel],
                color[channel],
                color[channel]
            );
        }

    return resource_new;
}

/**
 * Request information about font dimensions (if the resource is a font)
 * This will return incorrect results if called on a non-font resource
 *
 * @param resource BMPJS Resource
 * @return         Array [font_width, font_height, font_chars]
 */
 function bmp_mod_dissect_font(resource) {
    var font_width  = resource.width / 96;
    var font_height = resource.height;
    var font_chars  = resource.width / font_width;

    return [font_width, font_height, font_chars];
}

/**
 * Reverse the image horizontally (X axis)
 *
 * @param resource BMPJS Resource
 * @return         BMPJS Resource
 */
function bmp_mod_flip_x(resource) {
    var width  = resource.width;
    var height = resource.height;

    var resource_new = bmp_resource_create(width, height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var c = bmp_resource_get_pixel(resource, x, y);
            var x2 = Math.abs(width - x) - 1;
            bmp_resource_set_pixel(resource_new, x2, y, c[0], c[1], c[2]);
        }
    }

    return resource_new;
}

/**
 * Reverse the image vertically (Y axis)
 *
 * @param resource BMPJS Resource
 * @return         BMPJS Resource
 */
 function bmp_mod_flip_y(resource) {
    var width  = resource.width;
    var height = resource.height;

    var resource_new = bmp_resource_create(width, height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var c = bmp_resource_get_pixel(resource, x, y);
            var y2 = Math.abs(height - y) - 1;
            bmp_resource_set_pixel(resource_new, x, y2, c[0], c[1], c[2]);
        }
    }

    return resource_new;
}

/**
 * Rotate the image to the right
 *
 * @param resource BMPJS Resource
 * @return         BMPJS Resource
 */
function bmp_mod_rotate_right(resource) {
    var width = resource.width;
    var height = resource.height;

    var resource_new = bmp_resource_create(height, width);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var c = bmp_resource_get_pixel(resource, x, y);
            var y2 = Math.abs(height - y) - 1;
            bmp_resource_set_pixel(resource_new, y2, x, c[0], c[1], c[2]);
        }
    }

    return resource_new;
}

/**
 * Rotate the image to the left
 *
 * @param resource BMPJS Resource
 * @return         BMPJS Resource
 */
function bmp_mod_rotate_left(resource) {
    var width = resource.width;
    var height = resource.height;

    var resource_new = bmp_resource_create(height, width);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var c = bmp_resource_get_pixel(resource, x, y);
            var x2 = Math.abs(width - x) - 1;
            bmp_resource_set_pixel(resource_new, y, x2, c[0], c[1], c[2]);
        }
    }

    return resource_new;
}

/**
 * Replace a specific color in the image
 *
 * @param resource BMPJS Resource
 * @param pr       Color channel Red   (parent)
 * @param pg       Color channel Green (parent)
 * @param pb       Color channel Blue  (parent)
 * @param cr       Color channel Red   (child)
 * @param cg       Color channel Green (child)
 * @param cb       Color channel Blue  (child)
 * @return         BMPJS Resource
 */
function bmp_mod_replace_color(resource, pr, pg, pb, cr, cg, cb) {
    var width = resource.width;
    var height = resource.height;

    var resource_new = bmp_resource_copy(resource);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var color = bmp_resource_get_pixel(resource, x, y);
            if (color[0] == pr &&
                color[1] == pg &&
                color[2] == pb)
                bmp_resource_set_pixel(resource_new, x, y, cr, cg, cb);
        }
    }

    return resource_new;
}

/**
 * Add grayscale noise to an image
 *
 * @param resource BMPJS Resource
 * @param scale    Amount of blur to add ranging from 0.0 to 10.0
 * @return         BMPJS Resource
 */
function bmp_mod_noise_grayscale(resource, scale = 0.1) {
    scale = clamp(scale, 0, 10);
    var width = resource.width;
    var height = resource.height;

    var resource_new = bmp_resource_copy(resource);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var c = bmp_resource_get_pixel(resource, x, y);
            var noise = Math.floor(Math.random(0) * (255 * scale));
            c[0] = clamp(c[0] + noise, 0, 255);
            c[1] = clamp(c[1] + noise, 0, 255);
            c[2] = clamp(c[2] + noise, 0, 255);
            bmp_resource_set_pixel(resource_new, x, y, c[0], c[1], c[2]);
        }
    }

    return resource_new;
}

/**
 * Add RGB noise to an image
 *
 * @param resource BMPJS Resource
 * @param scale    Amount of blur to add ranging from 0.0 to 10.0
 * @return         BMPJS Resource
 */
 function bmp_mod_noise_rgb(resource, scale = 0.1) {
    scale = clamp(scale, 0, 10);
    var width = resource.width;
    var height = resource.height;

    var resource_new = bmp_resource_copy(resource);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var c = bmp_resource_get_pixel(resource, x, y);
            var noise1 = Math.floor(Math.random(0) * (255 * scale));
            var noise2 = Math.floor(Math.random(0) * (255 * scale));
            var noise3 = Math.floor(Math.random(0) * (255 * scale));
            c[0] = clamp(c[0] + noise1, 0, 255);
            c[1] = clamp(c[1] + noise2, 0, 255);
            c[2] = clamp(c[2] + noise3, 0, 255);
            bmp_resource_set_pixel(resource_new, x, y, c[0], c[1], c[2]);
        }
    }

    return resource_new;
}

/**
 * Invert colors of an image
 *
 * @param resource BMPJS Resource
 * @return         BMPJS Resource
 */
function bmp_mod_color_invert(resource) {
    var width = resource.width;
    var height = resource.height;

    var resource_new = bmp_resource_copy(resource);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var c = bmp_resource_get_pixel(resource, x, y);
            c[0] = Math.abs(c[0] - 255);
            c[1] = Math.abs(c[1] - 255);
            c[2] = Math.abs(c[2] - 255);
            bmp_resource_set_pixel(resource_new, x, y, c[0], c[1], c[2]);
        }
    }

    return resource_new;
}

/**
 * Turn colors to grayscale in an image
 *
 * @param resource BMPJS Resource
 * @return         BMPJS Resource
 */
function bmp_mod_color_grayscale(resource) {
    var width = resource.width;
    var height = resource.height;

    var resource_new = bmp_resource_create(width, height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var c = bmp_resource_get_pixel(resource, x, y);
            var c = clamp(
                (c[0] + c[1] + c[2]) / 3, // This may not be the accurate way
                0,
                255
            );
            bmp_resource_set_pixel(resource_new, x, y, c, c, c);
        }
    }

    return resource_new;
}

/**
 * Convert an image to appear like a 1-bit image
 *
 * @param resource BMPJS Resource
 * @return         BMPJS Resource
 */
function bmp_mod_color_1bit(resource) {
    var width = resource.width;
    var height = resource.height;

    var resource_new = bmp_resource_create(width, height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var c = bmp_resource_get_pixel(resource, x, y);
            c = clamp((c[0] + c[1] + c[2]) / 3, 0, 255);
            c = c > 127 ? 255 : 0;
            bmp_resource_set_pixel(resource_new, x, y, c, c, c);
        }
    }

    return resource_new;
}
