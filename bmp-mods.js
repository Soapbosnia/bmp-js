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
// Updated: 2022-12-15 11:31 AM
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
    var resource_new = bmp_resource_copy(resource);
    var w = resource.width;
    var h = resource.height;

    if (matrix.length != 9 && matrix.length != 25)
        throw("Convolution matrix must be of size 3x3 (9) or 5x5 (25)");

    // Convolution matrix (3 x 3)
    //var cm = [
    //     0, -1,  0,
    //    -1,  5, -1,
    //     0, -1,  0
    //];

    var cm = matrix;

    // MATRIX_3X3
    if (matrix.length == 9) {

        for (let x = 0; x < w; x++)
        {
            for (let y = 0; y < h; y++)
            {
                /* 3 x 3 grid */
                var ct  = bmp_resource_get_pixel(resource, x    , y - 1);
                var ctl = bmp_resource_get_pixel(resource, x - 1, y - 1);
                var ctr = bmp_resource_get_pixel(resource, x + 1, y - 1);

                var c   = bmp_resource_get_pixel(resource, x    , y    );
                var cl  = bmp_resource_get_pixel(resource, x - 1, y    );
                var cr  = bmp_resource_get_pixel(resource, x + 1, y    );

                var cb  = bmp_resource_get_pixel(resource, x    , y + 1);
                var cbl = bmp_resource_get_pixel(resource, x - 1, y + 1);
                var cbr = bmp_resource_get_pixel(resource, x + 1, y + 1);

                /* Apply convolution matrix */
                ctl[0] *= cm[0];
                ctl[1] *= cm[0];
                ctl[2] *= cm[0];

                ct[0]  *= cm[1];
                ct[1]  *= cm[1];
                ct[2]  *= cm[1];

                ctr[0] *= cm[2];
                ctr[1] *= cm[2];
                ctr[2] *= cm[2];

                cl[0]  *= cm[3];
                cl[1]  *= cm[3];
                cl[2]  *= cm[3];

                c[0]   *= cm[4];
                c[1]   *= cm[4];
                c[2]   *= cm[4];

                cr[0]  *= cm[5];
                cr[1]  *= cm[5];
                cr[2]  *= cm[5];

                cbl[0] *= cm[6];
                cbl[1] *= cm[6];
                cbl[2] *= cm[6];

                cb[0]  *= cm[7];
                cb[1]  *= cm[7];
                cb[2]  *= cm[7];

                cbr[0] *= cm[8];
                cbr[1] *= cm[8];
                cbr[2] *= cm[8];

                var avg = [
                    (ct[0] + ctl[0] + ctr[0] + cb[0] + cbl[0] + cbr[0] + c[0] + cl[0] + cr[0]) / divisor,
                    (ct[1] + ctl[1] + ctr[1] + cb[1] + cbl[1] + cbr[1] + c[1] + cl[1] + cr[1]) / divisor,
                    (ct[2] + ctl[2] + ctr[2] + cb[2] + cbl[2] + cbr[2] + c[2] + cl[2] + cr[2]) / divisor
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

    // MATRIX_5X5

    if (matrix.length == 25) {
        throw("5x5 matrix not implemented");
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
