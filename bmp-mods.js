//
// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Bitmap Image Encoder/Decoder - Mods
// https://www.github.com/oxou/bmp-js
//
// This file is a part of bmp.js but its contents are contained separately.
//
// Adds extra functionality for manipulating BMPJS resources.
//
// Created: 2022-09-28 06:42 PM
// Updated: 2022-12-17 05:07 PM
//

/**
 * Retrieve a specific color channel from a resource
 *
 * @param resource BMPJS Resource
 * @param channel  Channel index (0 = Red, 1 = Green, 2 = Blue) (default 0)
 * @return         BMPJS Resource
 */
function bmp_mod_get_channel(
    resource,
    channel = 0
) {
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
 * @return         [font_width, font_height, font_chars]
 */
function bmp_mod_dissect_font(
    resource
) {
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
function bmp_mod_flip_x(
    resource
) {
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
function bmp_mod_flip_y(
    resource
) {
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
function bmp_mod_rotate_right(
    resource
) {
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
function bmp_mod_rotate_left(
    resource
) {
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
function bmp_mod_replace_color(
    resource,
    pr,
    pg,
    pb,
    cr,
    cg,
    cb
) {
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
 * @param scale    Amount of noise to add ranging from 0.0 to 10.0
 * @return         BMPJS Resource
 */
function bmp_mod_noise_grayscale(
    resource,
    scale = 0.1
) {
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
 * @param scale    Amount of noise to add ranging from 0.0 to 10.0
 * @return         BMPJS Resource
 */
function bmp_mod_noise_rgb(
    resource,
    scale = 0.1
) {
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
function bmp_mod_color_invert(
    resource
) {
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
function bmp_mod_color_grayscale(
    resource
) {
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
function bmp_mod_color_1bit(
    resource
) {
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

/**
 * Add grayscale noise to an image
 *
 * @param resource BMPJS Resource
 * @param scale    Amount of noise to add ranging from 0.0 to 10.0
 * @return         BMPJS Resource
 */
function bmp_mod_noise_grayscale(
    resource,
    scale = 0.1
) {
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
 * @param scale    Amount of noise to add ranging from 0.0 to 10.0
 * @return         BMPJS Resource
 */
function bmp_mod_noise_rgb(
    resource,
    scale = 0.1
) {
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
 * Apply a convolution matrix to an image.
 * More information about that here:
 *  - https://en.wikipedia.org/wiki/Kernel_(image_processing)
 *  - https://en.wikipedia.org/wiki/Convolution
 *  - https://docs.gimp.org/2.8/en/plug-in-convmatrix.html
 *
 * @param resource BMPJS Resource
 * @param matrix   Convolution matrix (3x3 and 5x5 only)
 * @param divisor  How much to divide the average result (default 1)
 * @param offset   Value to add to the quotient (division result)
 * @return         BMPJS Resource
 */
function bmp_mod_apply_convolution_matrix(
    resource,
    matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    divisor = 1,
    offset = 0
) {
    if (matrix.length != 9 && matrix.length != 25)
        throw("Convolution matrix must be of size 3x3 (9) or 5x5 (25)");

    var resource_new = bmp_resource_copy(resource);
    var w = resource.width;
    var h = resource.height;


    var cm = matrix;

    // Convolution matrix (3 x 3)
    //
    // [
    //    A0  A1  A2
    //
    //    B0  B1  B2
    //
    //    C0  C1  C2
    // ]
    if (matrix.length == 9) {

        for (let x = 0; x < w; x++)
        {
            for (let y = 0; y < h; y++)
            {
                /* 3 x 3 grid */
                var a0 = bmp_resource_get_pixel(resource, x - 1, y - 1);
                var a1 = bmp_resource_get_pixel(resource, x    , y - 1);
                var a2 = bmp_resource_get_pixel(resource, x + 1, y - 1);

                var b0 = bmp_resource_get_pixel(resource, x - 1, y    );
                var b1 = bmp_resource_get_pixel(resource, x    , y    );
                var b2 = bmp_resource_get_pixel(resource, x + 1, y    );

                var c0 = bmp_resource_get_pixel(resource, x - 1, y + 1);
                var c1 = bmp_resource_get_pixel(resource, x    , y + 1);
                var c2 = bmp_resource_get_pixel(resource, x + 1, y + 1);

                /* Apply convolution matrix */
                a0[0] *= cm[0];
                a0[1] *= cm[0];
                a0[2] *= cm[0];

                a1[0] *= cm[1];
                a1[1] *= cm[1];
                a1[2] *= cm[1];

                a2[0] *= cm[2];
                a2[1] *= cm[2];
                a2[2] *= cm[2];

                b0[0] *= cm[3];
                b0[1] *= cm[3];
                b0[2] *= cm[3];

                b1[0] *= cm[4];
                b1[1] *= cm[4];
                b1[2] *= cm[4];

                b2[0] *= cm[5];
                b2[1] *= cm[5];
                b2[2] *= cm[5];

                c0[0] *= cm[6];
                c0[1] *= cm[6];
                c0[2] *= cm[6];

                c1[0] *= cm[7];
                c1[1] *= cm[7];
                c1[2] *= cm[7];

                c2[0] *= cm[8];
                c2[1] *= cm[8];
                c2[2] *= cm[8];

                var avg = [
                    (a0[0] + a1[0] + a2[0] +
                     b0[0] + b1[0] + b2[0] +
                     c0[0] + c1[0] + c2[0]) / divisor,

                    (a0[1] + a1[1] + a2[1] +
                     b0[1] + b1[1] + b2[1] +
                     c0[1] + c1[1] + c2[1]) / divisor,

                    (a0[2] + a1[2] + a2[2] +
                     b0[2] + b1[2] + b2[2] +
                     c0[2] + c1[2] + c2[2]) / divisor
                ];

                bmp_resource_set_pixel(
                    resource_new,
                    x,
                    y,
                    avg[0] + offset,
                    avg[1] + offset,
                    avg[2] + offset
                );
            }
        }

    }

    // Convolution matrix (5 x 5)
    //
    // [
    //    A0  A1  A2  A3  A4
    //
    //    B0  B1  B2  B3  B4
    //
    //    C0  C1  C2  C3  C4
    //
    //    D0  D1  D2  D3  D4
    //
    //    E0  E1  E2  E3  E4
    // ]
    if (matrix.length == 25) {

        for (let x = 0; x < w; x++)
        {
            for (let y = 0; y < h; y++)
            {
                /* 5 x 5 grid */
                var a0 = bmp_resource_get_pixel(resource, x - 2, y - 2);
                var a1 = bmp_resource_get_pixel(resource, x - 1, y - 2);
                var a2 = bmp_resource_get_pixel(resource, x    , y - 2);
                var a3 = bmp_resource_get_pixel(resource, x + 1, y - 2);
                var a4 = bmp_resource_get_pixel(resource, x + 2, y - 2);

                var b0 = bmp_resource_get_pixel(resource, x - 2, y - 1);
                var b1 = bmp_resource_get_pixel(resource, x - 1, y - 1);
                var b2 = bmp_resource_get_pixel(resource, x    , y - 1);
                var b3 = bmp_resource_get_pixel(resource, x + 1, y - 1);
                var b4 = bmp_resource_get_pixel(resource, x + 2, y - 1);

                var c0 = bmp_resource_get_pixel(resource, x - 2, y    );
                var c1 = bmp_resource_get_pixel(resource, x - 1, y    );
                var c2 = bmp_resource_get_pixel(resource, x    , y    );
                var c3 = bmp_resource_get_pixel(resource, x + 1, y    );
                var c4 = bmp_resource_get_pixel(resource, x + 2, y    );

                var d0 = bmp_resource_get_pixel(resource, x - 2, y + 1);
                var d1 = bmp_resource_get_pixel(resource, x - 1, y + 1);
                var d2 = bmp_resource_get_pixel(resource, x    , y + 1);
                var d3 = bmp_resource_get_pixel(resource, x + 1, y + 1);
                var d4 = bmp_resource_get_pixel(resource, x + 2, y + 1);

                var e0 = bmp_resource_get_pixel(resource, x - 2, y + 2);
                var e1 = bmp_resource_get_pixel(resource, x - 1, y + 2);
                var e2 = bmp_resource_get_pixel(resource, x    , y + 2);
                var e3 = bmp_resource_get_pixel(resource, x + 1, y + 2);
                var e4 = bmp_resource_get_pixel(resource, x + 2, y + 2);

                /* Apply convolution matrix */
                a0[0] *= cm[0];
                a0[1] *= cm[0];
                a0[2] *= cm[0];

                a1[0] *= cm[1];
                a1[1] *= cm[1];
                a1[2] *= cm[1];

                a2[0] *= cm[2];
                a2[1] *= cm[2];
                a2[2] *= cm[2];

                a3[0] *= cm[3];
                a3[1] *= cm[3];
                a3[2] *= cm[3];

                a4[0] *= cm[4];
                a4[1] *= cm[4];
                a4[2] *= cm[4];

                b0[0] *= cm[5];
                b0[1] *= cm[5];
                b0[2] *= cm[5];

                b1[0] *= cm[6];
                b1[1] *= cm[6];
                b1[2] *= cm[6];

                b2[0] *= cm[7];
                b2[1] *= cm[7];
                b2[2] *= cm[7];

                b3[0] *= cm[8];
                b3[1] *= cm[8];
                b3[2] *= cm[8];

                b4[0] *= cm[9];
                b4[1] *= cm[9];
                b4[2] *= cm[9];

                c0[0] *= cm[10];
                c0[1] *= cm[10];
                c0[2] *= cm[10];

                c1[0] *= cm[11];
                c1[1] *= cm[11];
                c1[2] *= cm[11];

                c2[0] *= cm[12];
                c2[1] *= cm[12];
                c2[2] *= cm[12];

                c3[0] *= cm[13];
                c3[1] *= cm[13];
                c3[2] *= cm[13];

                c4[0] *= cm[14];
                c4[1] *= cm[14];
                c4[2] *= cm[14];

                d0[0] *= cm[15];
                d0[1] *= cm[15];
                d0[2] *= cm[15];

                d1[0] *= cm[16];
                d1[1] *= cm[16];
                d1[2] *= cm[16];

                d2[0] *= cm[17];
                d2[1] *= cm[17];
                d2[2] *= cm[17];

                d3[0] *= cm[18];
                d3[1] *= cm[18];
                d3[2] *= cm[18];

                d4[0] *= cm[19];
                d4[1] *= cm[19];
                d4[2] *= cm[19];

                e0[0] *= cm[20];
                e0[1] *= cm[20];
                e0[2] *= cm[20];

                e1[0] *= cm[21];
                e1[1] *= cm[21];
                e1[2] *= cm[21];

                e2[0] *= cm[22];
                e2[1] *= cm[22];
                e2[2] *= cm[22];

                e3[0] *= cm[23];
                e3[1] *= cm[23];
                e3[2] *= cm[23];

                e4[0] *= cm[24];
                e4[1] *= cm[24];
                e4[2] *= cm[24];

                var avg = [
                    (a0[0] + a1[0] + a2[0] + a3[0] + a4[0] +
                     b0[0] + b1[0] + b2[0] + b3[0] + b4[0] +
                     c0[0] + c1[0] + c2[0] + c3[0] + c4[0] +
                     d0[0] + d1[0] + d2[0] + d3[0] + d4[0] +
                     e0[0] + e1[0] + e2[0] + e3[0] + e4[0]) / divisor,

                    (a0[1] + a1[1] + a2[1] + a3[1] + a4[1] +
                     b0[1] + b1[1] + b2[1] + b3[1] + b4[1] +
                     c0[1] + c1[1] + c2[1] + c3[1] + c4[1] +
                     d0[1] + d1[1] + d2[1] + d3[1] + d4[1] +
                     e0[1] + e1[1] + e2[1] + e3[1] + e4[1]) / divisor,

                    (a0[2] + a1[2] + a2[2] + a3[2] + a4[2] +
                     b0[2] + b1[2] + b2[2] + b3[2] + b4[2] +
                     c0[2] + c1[2] + c2[2] + c3[2] + c4[2] +
                     d0[2] + d1[2] + d2[2] + d3[2] + d4[2] +
                     e0[2] + e1[2] + e2[2] + e3[2] + e4[2]) / divisor,
                ];

                bmp_resource_set_pixel(
                    resource_new,
                    x,
                    y,
                    avg[0] + offset,
                    avg[1] + offset,
                    avg[2] + offset
                );
            }
        }

    }

    return resource_new;
}

/**
 * Sharpen an image
 *
 * @param resource BMPJS Resource
 * @return         BMPJS Resource
 */
function bmp_mod_sharpen(
    resource
) {
    var resource_new = bmp_resource_copy(resource);

    resource_new = bmp_mod_apply_convolution_matrix(
        resource_new,
        [
             0,-1, 0,
            -1, 5,-1,
             0,-1, 0
        ]
    );

    return resource_new;
}

/**
 * Resize an image (using nearest neighbor)
 *
 * @param resource BMPJS Resource
 * @param w        Width   (Rounded to nearest place)
 * @param h        Height  (Rounded to nearest place)
 * @return         BMPJS Resource
 */
function bmp_mod_resize(
    resource,
    w,
    h
) {
    w = Math.round(w);
    h = Math.round(h);

    // If the dimensions have not changed,
    // return the affectee resource
    if (w == resource.width && h == resource.height)
        return resource;

    var resource_new = bmp_resource_create(w, h);

    // Difference values between resource
    // and resource_new dimensions
    xd = resource.width  / w;
    yd = resource.height / h;

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            var c = bmp_resource_get_pixel(
                resource,
                xd * x,
                yd * y
            );

            for (let i = 0; i < xd; i += xd) {
                for (let j = 0; j < yd; j += yd) {
                    bmp_resource_set_pixel(
                        resource_new,
                        x + i,
                        y + j,
                        c[0],
                        c[1],
                        c[2]
                    );
                }
            }
        }
    }

    return resource_new;
}

/**
 * Pixelate an image
 *
 * @param resource BMPJS Resource
 * @param factor   How much to divide image dimensions before upsampling (default 2, min 1)
 * @return         BMPJS Resource
 */
function bmp_mod_pixelate(
    resource,
    factor = 2
) {
    // Factor min can be 1
    factor = Math.round(clamp(factor, 1));

    // If factor is 1 return the affectee resource
    if (factor == 1)
        return resource;

    var resource_new = bmp_resource_copy(bmp_resource);

    // Original dimensions
    var ow = resource.width;
    var oh = resource.height;

    // Sampled dimensions
    var sw = clamp(Math.round(ow / factor), 1);
    var sh = clamp(Math.round(oh / factor), 1);

    // Downsample and upsample using nearest neighbor
    resource_new = bmp_mod_resize(resource_new, sw, sh);
    resource_new = bmp_mod_resize(resource_new, ow, oh);

    return resource_new;
}

/**
 * Crop an image.
 *
 * In Mode 1, X1 and Y1 cannot be bigger than X2 and Y2 respectively.
 * X1 and Y1 define Point #1 on the image which is the starting point
 * and X2 and Y2 define Point #2 which is the ending point.
 * All values between those 2 points will be the returned resource
 * that contains the pixel data cropped within that area.
 *
 * If X1 or Y1 are equal to their neighboring counterparts, then the
 * values of X2 or Y2 are increment by 1.
 * If X1 is 42 and X2 is 42 then X2 will be 43 as we cannot return
 * a cropped image if the 2 points fall on the same exact coordinate i.e.
 * we cannot have an image whose sides are 0.
 *
 * Mode 2 overrides the resource_new width and height by treating
 * X2 and Y2 as the dimensions and not the 2nd point on the image.
 *
 * If the width or height exceed the boundary of the affectee resource
 * then the value that bmp_resource_get_pixel() returns by default when
 * out of bounds will be written to the copy resource.
 *
 * @param resource BMPJS Resource
 * @param x1       Position X #1
 * @param y1       Position Y #1
 * @param x2       Position X #2 (Mode 2 uses it as width)
 * @param y2       Position Y #2 (Mode 2 uses it as height)
 * @param mode2    This is so values [x2, y2] are used as width and height of the returned resource
 * @return         BMPJS Resource
 */
function bmp_mod_crop(
    resource,
    x1    = 0,
    y1    = 0,
    x2    = 1,
    y2    = 1,
    mode2 = 0
) {
    x1 = Math.round(Math.abs(x1));
    y1 = Math.round(Math.abs(y1));
    x2 = Math.round(Math.abs(x2));
    y2 = Math.round(Math.abs(y2));

    if (!mode2) {
        // Here we try to save people from making pesky mistakes
        if (x1 == x2)
            ++x2;

        if (y1 == y2)
            ++y2;

        // If Point #1 is bigger than Point #2 then flip their values
        if (x1 > x2) {
            tx = x1;
            x1 = x2;
            x2 = tx;
        }

        if (y1 > y2) {
            ty = y1;
            y1 = y2;
            y2 = ty;
        }
    }

    // Point #2 must be within the dimension boundaries of the resource
    if (!mode2) {
        x2 = clamp(x2, 0, resource.width);
        y2 = clamp(y2, 0, resource.height);
    }

    var w, h;

    if (mode2) {
        w = x2;
        h = y2;
    } else {
        w = Math.round(x2 - x1);
        h = Math.round(y2 - y1);
    }

    var resource_new = bmp_resource_create(w, h);

    var mx = w + x1;
    var my = h + y1;

    for (let x = x1; x < mx; x++)
        for (let y = y1; y < my; y++) {
            var c = bmp_resource_get_pixel(
                resource,
                x,
                y
            );

            bmp_resource_set_pixel(
                resource_new,
                x - x1,
                y - y1,
                c[0],
                c[1],
                c[2]
            );
        }

    return resource_new;
}
