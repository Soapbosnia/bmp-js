//
// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Bitmap Image Encoder/Decoder
// https://www.github.com/oxou/bmp-js
//
// Created: 2022-09-05 09:46 AM
// Updated: 2023-03-20 01:16 PM
//

//
// Developer Notes
// ---------------
//
// - Each bitmap resource treats the image as having 8 bits per color channel,
//   If an image is 1-bit, 8-bit or 16-bit, all values are automagically treated
//   as 32-bit (R8 G8 B8 A8).
//
// - Each bitmap file has a thing called "padding", it's where each RGB byte
//   is padded with null bytes on each end of the stride to make sure rows fit
//   in 32-bits of memory. The computer can operate faster on even values.
//
// - Ongoing work is being made to bring support to more bit depths other than
//   24 and 32-bit. We wanna have bit depths ranging from 16, 8, 4, 2 and 1.
//

//
// This sample header of 54 bytes is used by bmp_create() to construct
// valid information based on parameters passed to it. The function works in
// conjuction with bmp_le_int() to provide correct bit-endianness.
//
// Descriptions prepended with [*] are dynamic. This means that the
// bmp_create() function changes these bytes during creation.
//
const bmp_header_parts = [
    // Magic number or byte
    {
        size: 2,
        data: "\x42\x4D",
        addr: 0
    },

    // [*] File size
    // Formula for calculating file size is:
    // width * height * bytes_per_pixel + (height * padding) + 54
    //
    // The reason we add "+ 54" is due to the file header taking up 54 bytes.
    {
        addr: 2,
        size: 4,
        data: "\x00\x00\x00\x00"
    },

    // Reserved (can be 0) app-dependent
    {
        addr: 6,
        size: 2,
        data: "\x00\x00"
    },

    // Reserved (can be 0) app-dependent
    {
        addr: 8,
        size: 2,
        data: "\x00\x00"
    },

    // Offset (i.e. start addr. of image) (54)
    {
        addr: 10,
        size: 4,
        data: "\x36\x00\x00\x00"
    },

    // Size of this header, in bytes (40)
    {
        addr: 14,
        size: 4,
        data: "\x28\x00\x00\x00"
    },

    // [*] Bitmap width in pixels (signed int) (limit: 16384)
    {
        addr: 18,
        size: 4,
        data: "\x00\x00\x00\x00"
    },

    // [*] Bitmap height in pixels (signed int) (limit: 16384)
    {
        addr: 22,
        size: 4,
        data: "\x00\x00\x00\x00"
    },

    // Number of color planes (must be 1)
    {
        addr: 26,
        size: 2,
        data: "\x01\x00"
    },

    // Bit depth (We only support 32-bit for performance but we can load 24-bit)
    {
        addr: 28,
        size: 2,
        data: "\x20\x00"
    },

    // Compression method used
    {
        addr: 30,
        size: 4,
        data: "\x00\x00\x00\x00"
    },

    // [*] Raw bitmap size, 0 can be given for BI_RGB.
    // Formula for calculating bitmap size is:
    // width * height * bytes_per_pixel
    {
        addr: 34,
        size: 4,
        data: "\x00\x00\x00\x00"
    },

    // Horizontal resolution of the image. (pixel per metre, signed integer)
    // Default to 0
    {
        addr: 38,
        size: 4,
        data: "\x00\x00\x00\x00"
    },

    // Vertical resolution of the image. (pixel per metre, signed integer)
    // Default to 0
    {
        addr: 42,
        size: 4,
        data: "\x00\x00\x00\x00"
    },

    // Number of colors in the color palette, or 0 to default to 2n
    // Default to 0
    {
        addr: 46,
        size: 4,
        data: "\x00\x00\x00\x00"
    },

    // The number of important colors used, or 0 when every color is important;
    // generally ignored
    {
        addr: 50,
        size: 4,
        data: "\x00\x00\x00\x00"
    },

    // Raw bitmap pixel data. Each index contains 4 bytes (RGBA) and whole array
    // can be retrieved using bmp_get_pixels(resource) or individual
    // colors at X and Y coordinates using
    // bmp_get_pixel(resource, x, y)
    //
    // The size value of this data block is determined based on the width and
    // height.
    {
        addr: 54,
        size: -1,
        data: null
    }
];

var bmp_header_parts_size = 17;

const BMP_HEADER_MAGIC           = 0x0;
const BMP_HEADER_FILESIZE        = 0x1;
const BMP_HEADER_RESERVED1       = 0x2;
const BMP_HEADER_RESERVED2       = 0x3;
const BMP_HEADER_OFFSET          = 0x4;
const BMP_HEADER_HEADERSIZE      = 0x5;
const BMP_HEADER_WIDTH           = 0x6;
const BMP_HEADER_HEIGHT          = 0x7;
const BMP_HEADER_COLORPLANE      = 0x8;
const BMP_HEADER_BITDEPTH        = 0x9;
const BMP_HEADER_COMPRESSION     = 0xA;
const BMP_HEADER_BITMAPSIZE      = 0xB;
const BMP_HEADER_RESHOR          = 0xC;
const BMP_HEADER_RESVER          = 0xD;
const BMP_HEADER_COLORPALETTE    = 0xE;
const BMP_HEADER_IMPORTANTCOLORS = 0xF;
const BMP_HEADER_DATA            = 0x10;

/**
 * Converts integers to little-endian bytes
 *
 * @param value      Unsigned integer
 * @param pad_length Padding length
 * @param pad_left   True pads left (default), False pads right
 * @return           Little-endian (LE) bytes
 */
function bmp_le_int(value, pad_length = 2, pad_left = true) {
    value = dechex(value);
    value = pad_left
          ? value.padStart(pad_length, '0')
          : value.padEnd  (pad_length, '0');

    value = str_split(value, 2);
    value = value.reverse();
    value = value.join('');
    value = hex2bin(value);

    return value;
}

/**
 * Converts bytes from little-endian to integers
 *
 * @param value Bytes to integer
 * @return      Integer
 */
function bmp_le_byte(value) {
    value = bin2hex(value);
    value = str_split(value, 2);
    value = value.reverse();
    value = value.join('');
    value = hexdec(value);

    return Number(value);
}

/**
 * Create a BMP resource
 *
 * @param width  Width  (X axis) of the image (non-zero) (limit: 16384)
 * @param height Height (Y axis) of the image (non-zero) (limit: 16384)
 * @param canvas When writing to a canvas this must be true (default: false)
 * @return       false | BMPJS Resource
 */
function bmp_create(width, height, canvas = false) {
    width  = Math.floor(width);
    height = Math.floor(height);

    if (16384 < width ||
        16384 < height)
        return false;

    var header      = bmp_header_parts;
    var header_raw  = "";
    var padding     = width % 4;
    var bitmap      = bmp_create_pixels(width, height);
    var bitmap_size = width * height * 4 + (height * padding);

    header.forEach(function(header_object, header_index) {
        switch (header_index) {
            case BMP_HEADER_FILESIZE:
                header_raw += bmp_le_int(bitmap_size + 54, 8);
                return;

            case BMP_HEADER_WIDTH:
                header_raw += bmp_le_int(width, 8);
                return;

            case BMP_HEADER_HEIGHT:
                header_raw += bmp_le_int(height, 8);
                return;

            case BMP_HEADER_BITMAPSIZE:
                header_raw += bmp_le_int(bitmap_size, 8);
                return;
        }

        if (header[header_index].data != null)
            header_raw += header[header_index].data;
    });

    return {
        header:      byte_to_uint8clampedarray(header_raw),
        header_size: header_raw.length,
        header_raw:  header_raw,
        width:       width,
        height:      height,
        bitmap:      bitmap,
        bitmap_raw:  null,
        bitmap_size: bitmap_size,
        padding:     padding,
        filesize:    width * height * 4 + (height * padding) + 54,
        bpp:         4,
        canvas:      canvas,
        reference:   null
    };
}

/**
 * Verify that the BMP resource is valid
 *
 * @param resource BMPJS Resource
 * @param raw      Process raw data
 * @return         false | true
 */
function bmp_valid(resource, raw = false) {
    var header = raw
               ? resource
               : resource.header_raw;
    var status = false;

    try {
        status = (
            header[0] == "B" &&
            header[1] == "M"
        );
    } catch(e) {
        return false;
    }

    return status;
}

/**
 * Retrieve pixel RGBA value from X, Y coordinate of a resource
 *
 * @param resource BMPJS Resource
 * @param x        X axis
 * @param y        Y axis
 * @return         [R, G, B, A]
 */
function bmp_get_pixel(resource, x, y) {
    // WARN(oxou): Fallback to 0,0,0,255 if out of bounds.
    if (x > resource.width - 1 || y > resource.height - 1 || 0 > x || 0 > y)
        return [0, 0, 0, 255];

    var pos = bmp_getpos_32(resource.width, resource.height, x, y, !resource.canvas);

    var r, g, b, a;

    if (resource.canvas) {
        b = Number(resource.bitmap.data[pos + 2]);
        g = Number(resource.bitmap.data[pos + 1]);
        r = Number(resource.bitmap.data[pos + 0]);
        a = Number(resource.bitmap.data[pos + 3]);
    } else {
        b = Number(resource.bitmap.data[pos + 0]);
        g = Number(resource.bitmap.data[pos + 1]);
        r = Number(resource.bitmap.data[pos + 2]);
        a = Number(resource.bitmap.data[pos + 3]);
    }

    // WARN(oxou): We need this to fix the issue with bin2hex errors.
    r = isNaN(r) ? 0 : r;
    g = isNaN(g) ? 0 : g;
    b = isNaN(b) ? 0 : b;
    a = isNaN(a) ? 0 : a;

    return [r, g, b, a];
}

/**
 * Set pixel RGBA value at X, Y coordinate of a resource
 *
 * @param resource BMPJS Resource
 * @param x        X axis
 * @param y        Y axis
 * @param r        Color channel Red
 * @param g        Color channel Green
 * @param b        Color channel Blue
 * @param a        Color channel Alpha (untouched if null)
 * @return         true
 */
function bmp_set_pixel(
    resource,
    x,
    y,
    r = null,
    g = null,
    b = null,
    a = null
) {
    // WARN(oxou): Fake set_pixel success if out of bounds.
    if (x > resource.width - 1 || y > resource.height - 1 || 0 > x || 0 > y)
        return true;

    r = Math.floor(Number(r));
    g = Math.floor(Number(g));
    b = Math.floor(Number(b));

    // WARN(oxou): We need this to fix the issue with bin2hex errors.
    r = isNaN(r) ? 0 : r;
    g = isNaN(g) ? 0 : g;
    b = isNaN(b) ? 0 : b;

    var pos = bmp_getpos_32(resource.width, resource.height, x, y, !resource.canvas);

    if (resource.canvas) {
        resource.bitmap.data[pos + 0] = r;
        resource.bitmap.data[pos + 1] = g;
        resource.bitmap.data[pos + 2] = b;

        // WARN(oxou): Add isNaN() check to the Alpha channel
        if (a != null)
            resource.bitmap.data[pos + 3] = a;

        return true;
    }

    resource.bitmap.data[pos + 0] = b;
    resource.bitmap.data[pos + 1] = g;
    resource.bitmap.data[pos + 2] = r;

    // WARN(oxou): Add isNaN() check to the Alpha channel
    if (a != null)
        resource.bitmap.data[pos + 3] = a;

    return true;
}

/**
 * Converts resource.bitmap array into raw bytes and mutates
 * resource.bitmap_raw property
 *
 * @param resource BMPJS Resource
 * @return         true
 */
function bmp_to_bytes(resource) {
    var bitmap = resource.bitmap.data;
    var w      = resource.width;
    var p      = resource.padding;
    var strpad = "";

    bitmap = [...bitmap]; // Convert Uint8ClampedArray to a standard Array
    bitmap = bitmap.map(v => dechex(v).padStart(2, '0'));
    bitmap = bitmap.join('');
    bitmap = str_split(bitmap, w * 3 * 2); // NOTE(oxou): Do we have to do something here to fix corrupted bytes?
    strpad = String("00").repeat(p);
    bitmap = bitmap.join(strpad) + strpad;
    bitmap = hex2bin(bitmap);

    resource.bitmap_raw = bitmap;
    return true;
}

/**
 * Returns the image width and height for a BMPJS resource (if valid)
 *
 * @param resource BMPJS Resource
 * @return         false | [width, height]
 */
function bmp_size(resource) {
    if (!bmp_valid(resource))
        return false;

    return [resource.width, resource.height];
}

/**
 * Returns the bitmap from a BMPJS resource (if valid)
 *
 * @param resource BMPJS Resource
 * @return         false | Uint8ClampedArray
 */
function bmp_get_pixels(resource) {
    if (!bmp_valid(resource))
        return false;

    return resource.bitmap.data;
}

/**
 * Creates an ImageData object containing RGBA values for the resource
 * This function should only be called by the internals of the library
 *
 * @param width  Width  (X axis) of the image (non-zero)
 * @param height Height (Y axis) of the image (non-zero)
 * @return       false | ImageData
 */
function bmp_create_pixels(width, height) {
    var bitmap = new ImageData(width, height);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            var pos = bmp_getpos_32(width, height, x, y);
            bitmap.data[pos + 3] = 255; // Set Alpha to 255
        }
    }

    return bitmap;
}

/**
 * Resets all the values of the Alpha channel to 255
 *
 * @param resource BMPJS Resource
 * @return         false | true
 */
function bmp_reset_alpha(resource) {
    if (!bmp_valid(resource))
        return false;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            var pos = bmp_getpos_32(width, height, x, y);
            resource.bitmap.data[pos + 3] = 255;
        }
    }

    return true;
}

/**
 * Creates a Blob URI with fully-constructed BMP data
 *
 * @param resource BMPJS Resource
 * @return         The Blob URI containing fully-constructed BMP data
 */
function bmp_create_uri(resource) {
    var blob = new Blob(
        [
            resource.header,
            resource.bitmap.data
        ],
        {
            type: "image/bmp"
        }
    );
    var url = URL.createObjectURL(blob);

    return url;
}

/**
 * Creates an `img` or 'canvas' element that is appended to the `target`.\
 * The Image element src is set to the output of `bmp_create_uri(resource)'\
 * or else `bmp_to_canvas(canvas, resource)` in case of a Canvas element.
 *
 * @param resource BMPJS Resource
 * @param target   HTMLElement in which the image will be appended to
 * @return         false | Reference to the `img` or `canvas` element
 */
function bmp_spawn(resource, target = null) {
    if (!bmp_valid(resource))
        return false;

    if (target == null)
        return false;

    // If canvas is true then spawn a canvas element
    if (resource.canvas) {
        var canvas = document.createElement("canvas");
        canvas.context = canvas.getContext("2d");
        target.appendChild(canvas);

        canvas.width = resource.width;
        canvas.height = resource.height;

        // Write image to the canvas
        bmp_to_canvas(canvas, resource);
        resource.reference = canvas;

        // Return reference to the canvas element
        return canvas;
    }

    var image = document.createElement("img");
    image.src = bmp_create_uri(resource);

    target.appendChild(image);
    resource.reference = image;

    // Return reference to the image element
    return image;
}

/**
 * Replace the `resource` in the `target` element by creating a new one
 *
 * @param target   Value pointing to a previous reference returned by
 *                 bmp_resource_spawn()
 * @param resource BMPJS Resource
 * @return         false | true
 */
function bmp_replace(target = null, resource) {
    if (target == null)
        return false;

    if (!bmp_valid(resource))
        return false;

    if (target instanceof HTMLCanvasElement) {
        bmp_to_canvas(target, resource);
        return true;
    }

    URL.revokeObjectURL(target.src);
    target.src = bmp_create_uri(resource);

    return true;
}

/**
 * Determine the file size of the BMPJS resource based on resource properties
 *
 * @param resource BMPJS Resource
 * @return         Number
 */
function bmp_filesize(resource) {
    return resource.filesize;
}

/**
 * Decode raw Bitmap bytes to a BMPJS resource object
 *
 * @param bytes  Raw bytes of a valid BMP file
 * @param canvas When writing to a canvas this must be true (default: false)
 * @return       BMPJS resource
 */
function bmp_from_raw(bytes, canvas = false) {
    if (!bmp_valid(bytes, true))
        return false;

    //
    // NOTE(oxou):
    // Retrieve header size from BMP. Without this we can assume that the
    // header is 54 bytes in length, but this may not always be true.
    // In case we can't retrieve the header size, we fallback to 54.
    // Unfortunately this will almost likely cause problems that are
    // unfixable, as far as I know.
    //
    var header_offset = bmp_le_byte(
        bytes.substr(0xA, 0x4)
    );

    // Fallback to 54
    if (0 >= header_offset)
        header_offset = 54;

    var offsets = {
        magic:           BMP_HEADER_MAGIC,
        filesize:        BMP_HEADER_FILESIZE,
        reserved1:       BMP_HEADER_RESERVED1,
        reserved2:       BMP_HEADER_RESERVED2,
        offset:          BMP_HEADER_OFFSET,
        headersize:      BMP_HEADER_HEADERSIZE,
        width:           BMP_HEADER_WIDTH,
        height:          BMP_HEADER_HEIGHT,
        colorplane:      BMP_HEADER_COLORPLANE,
        bitdepth:        BMP_HEADER_BITDEPTH,
        compression:     BMP_HEADER_COMPRESSION,
        bitmapsize:      BMP_HEADER_BITMAPSIZE,
        reshor:          BMP_HEADER_RESHOR,
        resver:          BMP_HEADER_RESVER,
        colorpalette:    BMP_HEADER_COLORPALETTE,
        importantcolors: BMP_HEADER_IMPORTANTCOLORS,
        data:            BMP_HEADER_DATA
    };

    for (var i = 0, k = Object.keys(offsets); i < bmp_header_parts_size; i++) {
        if (typeof offsets[k[i]] !== "undefined") {
                       offsets[k[i]] = {};
            var addr = offsets[k[i]].addr = bmp_header_parts[i].addr;
            var size = offsets[k[i]].size = bmp_header_parts[i].size;

            if (i == BMP_HEADER_DATA) {
                size = bytes.length - header_offset;
                addr = header_offset;
            }

            offsets[k[i]].data = bytes.substr(addr, size);
        }
    }

    var width    = offsets .width    .data;
    var height   = offsets .height   .data;
    var bitdepth = offsets .bitdepth .data;
    var bitmap   = offsets .data     .data;

    width    = bmp_le_byte(width);
    height   = bmp_le_byte(height);
    bitdepth = bmp_le_byte(bitdepth);

    var resource = bmp_create(width, height, canvas);

    // Load 24-bit image as a 32-bit resource
    if (bitdepth == 24) {
        var bytes = byte_to_uint8clampedarray(bitmap);

        // Copy bytes from 24-bit to 32-bit resource
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                var pos = bmp_getpos_24(width, height, x, y, true);
                var r = Number(bytes[pos + 2]);
                var g = Number(bytes[pos + 1]);
                var b = Number(bytes[pos + 0]);
                bmp_set_pixel(resource, x, y, r, g, b, 255);
            }
        }
    }

    // Load 32-bit image
    if (bitdepth == 32) {
        var bytes = byte_to_uint8clampedarray(bitmap);

        if (canvas) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    var pos = bmp_getpos_32(width, height, x, y, true);
                    var r = Number(bytes[pos + 2]);
                    var g = Number(bytes[pos + 1]);
                    var b = Number(bytes[pos + 0]);
                    var a = Number(bytes[pos + 3]);
                    bmp_set_pixel(resource, x, y, r, g, b, a);
                }
            }
        } else {
            //
            // NOTE(oxou): Should I get rid of this?  We'll see.
            //
            resource.bitmap = new ImageData(bytes, width);
        }
    }

    resource.filesize = bytes.length;

    return resource;
}

/**
 * Get X and Y position from bytes of a 24-bit BMPJS resource.
 *
 * @param  w    Width
 * @param  h    Height
 * @param  x    Position X
 * @param  y    Position Y
 * @param  flip Whether to flip the Y axis upside-down
 * @return      Number
 */
function bmp_getpos_24(w, h, x, y, flip = true) {
    x = Math.round(x) * 3;
    y = Math.round(y) * 3;

    if (flip)
        y = Math.abs(y - (h * 3) + 3);

    var p = w % 4;
    pos = Math.round((w + (p / 3)) * y + x);
    return pos;
}

/**
 * Get X and Y position from bytes of a 32-bit BMPJS resource.
 *
 * @param  w    Width
 * @param  h    Height
 * @param  x    Position X
 * @param  y    Position Y
 * @param  flip Whether to flip the Y axis upside-down
 * @return      Number
 */
function bmp_getpos_32(w, h, x, y, flip = true) {
    x = Math.round(x) * 4;
    y = Math.round(y) * 4;

    if (flip)
        y = Math.abs(y - (h * 4) + 4);

    return w * y + x;
}

/**
 * Request a BMP file from a remote location using synchronous XMLHttpRequest.
 *
 * @param url URL pointing to a BMP file
 * @return    false | null | string
 */
function bmp_request(url = null) {
    return http_get_bytes(url);
}

/**
 * Uses structuredClone() to copy the resource object without reference.
 *
 * @param resource BMPJS Resource
 * @return         BMPJS Resource | false
 */
function bmp_copy(resource) {
    if (!bmp_valid(resource))
        return false;

    return structuredClone(resource);
}

/**
 * Prompt for a download of BMPJS resource.
 *
 * @param resource BMPJS Resource
 * @param filename Name of the downloaded file (default: download.bmp)
 * @return         false | true
 */
function bmp_save(resource, filename = "download.") {
    if (!bmp_valid(resource))
        return false;

    var anchor = document.createElement('a');

    // NOTE(oxou):
    // We have to do this because when we spawn a resource with the 'canvas'
    // flag set to true, the RGBA mapping differs drastically.  There could be
    // a way to modify bmp_create_uri() itself so that it correctly remaps the
    // bytes in a different order that's specific to the BMP format, but for now
    // I'm going this route.  This may change in the future as I think this is
    // too much bloat.  But going the opposite route may also introduce speed
    // and overall performance slowdowns.  Remapping those values shouldn't be
    // hard but I don't wanna waste time trying right now.
    //                                                     - 2023-03-20 01:13 PM
    if (!!resource.canvas && resource.reference instanceof HTMLCanvasElement) {
        anchor.href = resource.reference
                              .toDataURL("image/png")
                              .replace("image/png", "image/octet-stream");
    } else {
        anchor.href = bmp_create_uri(resource);
    }

    filename += resource.canvas ? "png" : "bmp";

    anchor.download = filename;
    anchor.style    = "display:none";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    return true;
}

/**
 * Write `resource` bitmap to the `target` canvas context.\
 * NOTE: This function is used internally by BMPJS and should not be
 * called in scripts.
 *
 * @param canvas   Value pointing to a previous reference returned by
 *                 bmp_resource_spawn() that is an instance of HTMLCanvasElement
 * @param resource BMPJS Resource
 * @return         false | true
 */
function bmp_to_canvas(canvas = null, resource) {
    if (canvas == null)
        return false;

    if (!bmp_valid(resource))
        return false;

    if (!(canvas instanceof HTMLCanvasElement))
        return false;

    // Update the canvas size before putting the image
    canvas.width  = resource.bitmap.width;
    canvas.height = resource.bitmap.height;

    canvas.context.putImageData(resource.bitmap, 0, 0);
    return true;
}

/**
 * Similar to bmp_request but returns a BMPJS Resource automatically
 *
 * @param url URL pointing to a BMP file
 * @return    false | BMPJS Resource
 */
function bmp_load(url = null) {
    var bytes = bmp_request(url);

    if (!bmp_valid(bytes, true))
        return false;

    var resource = bmp_from_raw(bytes);
    return resource;
}
