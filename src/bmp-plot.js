//
// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Bitmap Image Encoder/Decoder - Plot
// https://www.github.com/oxou/bmp-js
//
// This file is a part of bmp.js but its contents are contained separately.
//
// It defines plot functions for doing various operations to draw shapes
// on the bitmap.
//
// Created: 2022-09-19 09:32 PM
// Updated: 2023-03-27 03:24 PM
//

/**
 * Plot a rectangle
 *
 * @param resource BMPJS resource
 * @param x        Position X
 * @param y        Position Y
 * @param w        Width
 * @param h        Height
 * @param r        Color channel Red
 * @param g        Color channel Green
 * @param b        Color channel Blue
 * @param fill     Fill the area with color
 * @return         true
 */
function bmp_plot_rect(
    resource,
    x = 0,
    y = 0,
    w = 10,
    h = 10,
    r = 255,
    g = 255,
    b = 255,
    fill = false
) {
    if (fill) {
        for (let y2 = y; y2 < h + y; y2++)
            for (let x2 = x; x2 < w + x; x2++)
                if (resource.width  > x2 &&
                    resource.height > y2)
                    bmp_set_pixel(resource, x2, y2, r, g, b);
    } else {
        var x2 = w + x;
        var y2 = h + y;

        // top
        bmp_plot_line(resource, x, y, x2 - 1, y, r, g, b);

        // left
        bmp_plot_line(resource, x, y, x, y2, r, g, b);

        // bottom
        bmp_plot_line(resource, x, y2 - 1, x2 - 1, y2 - 1, r, g, b);

        // right
        bmp_plot_line(resource, x2 - 1, y, x2 - 1, y2, r, g, b);
    }

    return true;
}

/**
 * Clear everything from the bitmap (by default using Black color)
 *
 * @param resource BMPJS resource
 * @param r        Color channel Red
 * @param g        Color channel Green
 * @param b        Color channel Blue
 * @return         true
 */
function bmp_plot_clear(
    resource,
    r = 0,
    g = 0,
    b = 0
) {
    for (let y = 0; y < resource.height; y++)
        for (let x = 0; x < resource.width; x++)
            bmp_set_pixel(resource, x, y, r, g, b);

    return true;
}

/**
 * Plot a line from point A to B
 *
 * @param resource BMPJS resource
 * @param x1       Position X #1
 * @param y1       Position Y #1
 * @param x2       Position X #2
 * @param y2       Position Y #2
 * @param r        Color channel Red
 * @param g        Color channel Green
 * @param b        Color channel Blue
 * @param p        Precision of line (clamped from 0.1 to 2)
 * @return         true
 */
function bmp_plot_line(
    resource,
    x1,
    y1,
    x2,
    y2,
    r = 255,
    g = 255,
    b = 255,
    p = 1
) {
    p = clamp(p, 0.1, 2); // NOTE(OXOU): Should we even be clamping this value?
    var x = x2 - x1;
    var y = y2 - y1;
    var l = Math.sqrt(x * x + y * y) * p;

    var ax = x / l;
    var ay = y / l;

    x = x1;
    y = y1;

    for (let i = 0; i < l; i++) {
        if (resource.width > x &&
            resource.height > y)
            bmp_set_pixel(resource, x, y, r, g, b);

        x += ax;
        y += ay;
    }

    return true;
}

/**
 * Copy the contents from a resource child to the resource parent
 *
 * @param resource_p  BMPJS resource (parent)
 * @param resource_c  BMPJS resource (child)
 * @param x           Position X
 * @param y           Position Y
 * @param w           Width  (-1 = child's width)
 * @param h           Height (-1 = child's height)
 * @param ox          Offset to add to the X position of child
 * @param oy          Offset to add to the Y position of child
 * @param transparent Handle tr, tg and tb colors as transparency
 * @param tr          Red channel to be used as transparency
 * @param tg          Green channel to be used as transparency
 * @param tb          Blue channel to be used as transparency
 * @return            true
 */
function bmp_plot_resource(
    resource_p,
    resource_c,
    x = 0,
    y = 0,
    w = -1,
    h = -1,
    ox = 0,
    oy = 0,
    transparent = false,
    tr = -1,
    tg = -1,
    tb = -1
) {
    var resource_c = bmp_copy(resource_c);

    w = clamp(w, -1, resource_c.width);
    h = clamp(h, -1, resource_c.height);

    // If width or height are negative 1, we assign each the child's dimensions
    if (w == -1)
        w = resource_c.width;

    if (h == -1)
        h = resource_c.height;

    for (let x1 = 0; x1 < w; x1++) {
        for (let y1 = 0; y1 < h; y1++) {
            if (resource_p.width > x1 + x && resource_p.height > y1 + y) {
                var c = bmp_get_pixel(resource_c, x1 + ox, y1 + oy);

                if (transparent)
                    if (c[0] == tr &&
                        c[1] == tg &&
                        c[2] == tb)
                        continue;

                bmp_set_pixel(
                    resource_p,
                    x1 + x,
                    y1 + y,
                    c[0],
                    c[1],
                    c[2]
                );
            }
        }
    }

    return true;
}

/**
 * Use a loaded image resource that contains a character set range from
 * 0x20 to 0x80 to plot text
 *
 * @param resource_p BMPJS resource (parent)
 * @param resource_c BMPJS resource (child)
 * @param x          Position X
 * @param y          Position Y
 * @param text       Input String
 * @param wrap       Does text wrap around (default true)
 * @param fr         Color channel Red   (foreground)
 * @param fg         Color channel Green (foreground)
 * @param fb         Color channel Blue  (foreground)
 * @param br         Color channel Red   (background)
 * @param bg         Color channel Green (background)
 * @param bb         Color channel Blue  (background)
 * @return           true
 */
function bmp_plot_text(
    resource_p,
    resource_c,
    x,
    y,
    text = 'A',
    wrap = true,
    fr = 255,
    fg = 255,
    fb = 255,
    br = -1,
    bg = -1,
    bb = -1
) {
    // Offset we add to each x,y position in the for loop
    var x_offset_start = x;
    var y_offset_start = y; // not used
    var x_offset = x;
    var y_offset = y;

    // These are used in lx,ly as initial values, and will be incremented
    // accordingly either by the width or height of the font based on their
    // position relative to the parent dimensions.
    var x_start = 0;
    var y_start = 0;

    // Font width is calculated by diving the font width by the number of
    // total character range from 0x20 to 0x80 which is 96
    var font_width  = resource_c.width / 96;
    var font_height = resource_c.height;
    var font_chars  = resource_c.width / font_width;

    var text_length = text.length;

    for (let text_index = 0; text_index < text_length; text_index++) {
        var char_code = text.charCodeAt(text_index);
        var char_x_offset = (char_code - 32) * font_width;

        // Handle new lines
        if (char_code == 10 || char_code == 13) {
            x_offset  = x_offset_start;
            y_offset += font_height;
            continue;
        }

        // Out of range characters default to font character set
        // width - font_width
        if (0x20 > char_code || char_code > 0x7E)
            char_x_offset = font_width * (font_chars - 1);

        // Word wrap
        if (wrap && x_offset + font_width > resource_p.width) {
            x_offset  = x_offset_start;
            y_offset += font_height;
        }

        for (let ly = y_start; ly < font_height; ly++) {
            for (let lx = x_start; lx < font_width; lx++) {
                // Get the font pixel color based on char_x_offset
                var pixel_c = bmp_get_pixel(
                    resource_c,
                    lx + char_x_offset,
                    ly
                );

                // Foreground
                if (pixel_c[0] == 255 &&
                    pixel_c[1] == 255 &&
                    pixel_c[2] == 255) {
                    if (fr != -1 &&
                        fg != -1 &&
                        fb != -1) {
                        pixel_c[0] = fr;
                        pixel_c[1] = fg;
                        pixel_c[2] = fb;
                    } else {
                        continue;
                    }
                } else
                // Background
                if (pixel_c[0] == 0 &&
                    pixel_c[1] == 0 &&
                    pixel_c[2] == 0) {
                    if (br != -1 &&
                        bg != -1 &&
                        bg != -1) {
                        pixel_c[0] = br;
                        pixel_c[1] = bg;
                        pixel_c[2] = bb;
                    } else {
                        continue;
                    }
                }

                // Write the font pixel to the parent
                if (resource_p.width  > x_offset + lx &&
                    resource_p.height > y_offset + ly)
                    bmp_set_pixel(
                        resource_p,
                        x_offset + lx,
                        y_offset + ly,
                        pixel_c[0],
                        pixel_c[1],
                        pixel_c[2]
                    );
            }
        }

        x_offset += font_width;
    }

    return true;
}

/**
 * Plot a circle
 *
 * @param resource BMPJS resource
 * @param x        Position X
 * @param y        Position Y
 * @param w        Width
 * @param h        Height
 * @param r        Color channel Red
 * @param g        Color channel Green
 * @param b        Color channel Blue
 * @param p        Precision of line (clamped from 0.1 to 2) (ignored on fill)
 * @param fill     Fill the area with color
 * @param center   Treat X and Y as the center point of the circle
 * @param angles   Across what angle to plot the circle
 * @return         true
 */
function bmp_plot_circle(
    resource,
    x,
    y,
    w,
    h,
    r,
    g,
    b,
    p      = 1,
    fill   = false,
    center = false,
    angles = 360
) {
    var radian = w / 2;

    if (!fill) {
        p = 1 / p;
        p = clamp(p, 0.5, 10); // clamped from 0.1 to 2
        p -= .5;
    }

    // Offset from the center
    if (center == false) {
        x += w / 2;
        y += h / 2;
    }

    w = radian / w * 2.016;
    h = radian / h * 2.016;

    for (let angle = 0, x1, y1; angle < angles; angle += 0.05) {
        x1 = radian * Math.cos(deg2rad(angle)) / w;
        y1 = radian * Math.sin(deg2rad(angle)) / h;

        if (fill) {
            bmp_plot_line(resource, x, y, x + x1, y + y1, r, g, b);
        } else {
            if (p > 0)
                angle += p;
            bmp_set_pixel(resource, x + x1, y + y1, r, g, b);
        }
    }

    return true;
}

/**
 * Plot an arrow pointing up
 *
 * @param resource BMPJS resource
 * @param x        Position X
 * @param y        Position Y
 * @param w        Width
 * @param h        Height
 * @param r        Color channel Red
 * @param g        Color channel Green
 * @param b        Color channel Blue
 * @param p        Precision of line (clamped from 0.1 to 2)
 * @return         true
 */
function bmp_plot_arrow_up(
    resource,
    x,
    y,
    w,
    h,
    r,
    g,
    b,
    p = 1
) {
    var points = [
        [256,1],
        [512,256],
        [384,256],
        [384,512],
        [128,512],
        [128,256],
        [1,256],
        [256,1]
    ];

    for (let i = 1; i < 8; i++) {
        var last = points[i - 1];
        var curr = points[i];
        var lx = last[0] / 512 * w + x;
        var ly = last[1] / 512 * h + y;
        var cx = curr[0] / 512 * w + x;
        var cy = curr[1] / 512 * h + y;
        bmp_plot_line(resource, lx, ly, cx, cy, r, g, b, p);
    }

    return true;
}

/**
 * Plot an arrow pointing down
 *
 * @param resource BMPJS resource
 * @param x        Position X
 * @param y        Position Y
 * @param w        Width
 * @param h        Height
 * @param r        Color channel Red
 * @param g        Color channel Green
 * @param b        Color channel Blue
 * @param p        Precision of line (clamped from 0.1 to 2)
 * @return         true
 */
function bmp_plot_arrow_down(
    resource,
    x,
    y,
    w,
    h,
    r,
    g,
    b,
    p = 1
) {
    var points = [
        [128,0],
        [384,0],
        [384,256],
        [512,256],
        [256,512],
        [0,256],
        [128,256],
        [128,0]
    ];

    for (let i = 1; i < 8; i++) {
        var last = points[i - 1];
        var curr = points[i];
        var lx = last[0] / 512 * w + x;
        var ly = last[1] / 512 * h + y;
        var cx = curr[0] / 512 * w + x;
        var cy = curr[1] / 512 * h + y;
        bmp_plot_line(resource, lx, ly, cx, cy, r, g, b, p);
    }

    return true;
}

/**
 * Plot an arrow pointing left
 *
 * @param resource BMPJS resource
 * @param x        Position X
 * @param y        Position Y
 * @param w        Width
 * @param h        Height
 * @param r        Color channel Red
 * @param g        Color channel Green
 * @param b        Color channel Blue
 * @param p        Precision of line (clamped from 0.1 to 2)
 * @return         true
 */
function bmp_plot_arrow_left(
    resource,
    x,
    y,
    w,
    h,
    r,
    g,
    b,
    p = 1
) {
    var points = [
        [0,256],
        [256,0],
        [256,128],
        [512,128],
        [512,384],
        [256,384],
        [256,512],
        [0,256]
    ];

    for (let i = 1; i < 8; i++) {
        var last = points[i - 1];
        var curr = points[i];
        var lx = last[0] / 512 * w + x;
        var ly = last[1] / 512 * h + y;
        var cx = curr[0] / 512 * w + x;
        var cy = curr[1] / 512 * h + y;
        bmp_plot_line(resource, lx, ly, cx, cy, r, g, b, p);
    }

    return true;
}

/**
 * Plot an arrow pointing right
 *
 * @param resource BMPJS resource
 * @param x        Position X
 * @param y        Position Y
 * @param w        Width
 * @param h        Height
 * @param r        Color channel Red
 * @param g        Color channel Green
 * @param b        Color channel Blue
 * @param p        Precision of line (clamped from 0.1 to 2)
 * @return         true
 */
function bmp_plot_arrow_right(
    resource,
    x,
    y,
    w,
    h,
    r,
    g,
    b,
    p = 1
) {
    var points = [
        [0,128],
        [256,128],
        [256,0],
        [512,256],
        [256,512],
        [256,384],
        [0,384],
        [0,128]
    ];

    for (let i = 1; i < 8; i++) {
        var last = points[i - 1];
        var curr = points[i];
        var lx = last[0] / 512 * w + x;
        var ly = last[1] / 512 * h + y;
        var cx = curr[0] / 512 * w + x;
        var cy = curr[1] / 512 * h + y;
        bmp_plot_line(resource, lx, ly, cx, cy, r, g, b, p);
    }

    return true;
}

/**
 * Plot a triangle
 *
 * @param resource BMPJS resource
 * @param x        Position X
 * @param y        Position Y
 * @param w        Width
 * @param h        Height
 * @param r        Color channel Red
 * @param g        Color channel Green
 * @param b        Color channel Blue
 * @param p        Precision of line (clamped from 0.1 to 2)
 * @return         true
 */
function bmp_plot_triangle(
    resource,
    x,
    y,
    w,
    h,
    r,
    g,
    b,
    p = 1
) {
    var points = [
        [256,0],
        [512,512],
        [0,512],
        [256,0]
    ];

    for (let i = 1; i < 4; i++) {
        var last = points[i - 1];
        var curr = points[i];
        var lx = last[0] / 512 * w + x;
        var ly = last[1] / 512 * h + y;
        var cx = curr[0] / 512 * w + x;
        var cy = curr[1] / 512 * h + y;
        bmp_plot_line(resource, lx, ly, cx, cy, r, g, b, p);
    }

    return true;
}

/**
 * Fill the area with the given color starting from x,y until all occurences
 * of the background color have been replaced in that area.
 *
 * @param resource BMPJS resource
 * @param x        Position X
 * @param y        Position Y
 * @param r        Color channel Red
 * @param g        Color channel Green
 * @param b        Color channel Blue
 * @param callback Callback function (defaults to bmp_set_pixel)
 * @return         true
 */
function bmp_plot_fill(
    resource,
    x,
    y,
    r,
    g,
    b,
    callback = bmp_set_pixel
) {
    var fill_stack = [];
        fill_stack.push([x, y]);

    var bg_color = bmp_get_pixel(resource, x, y);

    if (callback === null)
        callback = bmp_set_pixel;

    // Let's not shoot ourselves in the foot
    if (bg_color[0] == r &&
        bg_color[1] == g &&
        bg_color[2] == b)
        return;

    while (fill_stack.length > 0) {
        var [x, y] = fill_stack.pop();
        var color = bmp_get_pixel(resource, x, y);

        if (0 > x || x > resource.width ||
            0 > y || y > resource.height)
            continue;

        if (color[0] != bg_color[0] ||
            color[1] != bg_color[1] ||
            color[2] != bg_color[2])
            continue;

        callback(resource, x, y, r, g, b);

        fill_stack.push([x + 1, y]);
        fill_stack.push([x - 1, y]);
        fill_stack.push([x, y + 1]);
        fill_stack.push([x, y - 1]);
    }

    return true;
}
