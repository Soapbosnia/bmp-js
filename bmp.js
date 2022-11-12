//
// Copyright (C) 2022 Nurudin Imsirovic <github.com/oxou>
//
// Bitmap Image Encoder/Decoder
// https://www.github.com/oxou/bmp-js
//
// Created: 2022-09-05 09:46 AM
// Updated: 2022-11-12 04:44 PM
//

//
// Developer Notes
// ---------------
//
// - Each bitmap resource treats the image as having 8 bits per color channel,
//   If an image is 1-bit, 8-bit or 16-bit, all values are automagically treated
//   as 24-bit (R8 G8 B8), however this might change.
//
// - Each bitmap file has a thing called "padding", it's where each RGB byte
//   is padded with null bytes to make sure rows fit in 32-bits of memory.
//   The computer can operate faster on even values.
//

//
// This sample header of 54 bytes is used by bmp_resource_create() to construct
// valid information based on parameters passed to it. The function works in
// conjuction with bmp_little_endian_int() to provide correct bit-endianness.
//
// Descriptions prepended with [*] are dynamic. This means that the
// bmp_resource_create() function changes these bytes during creation.
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
    // bitmap_width * bitmap_height * 3 + (bitmap_height * padding) + 54
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

    // [*] Bitmap width in pixels (signed int)
    {
        addr: 18,
        size: 4,
        data: "\x00\x00\x00\x00"
    },

    // [*] Bitmap height in pixels (signed int)
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

    // Bit depth (We always default to 24)
    {
        addr: 28,
        size: 2,
        data: "\x18\x00"
    },

    // Compression method used
    {
        addr: 30,
        size: 4,
        data: "\x00\x00\x00\x00"
    },

    // [*] Raw bitmap size, 0 can be given for BI_RGB.
    // Formula for calculating bitmap size is:
    // bitmap_width * bitmap_height * 3
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

    // Raw bitmap pixel data. Each index contains 3 bytes (RGB) and whole array
    // can be retrieved using bmp_resource_get_pixels(resource) or individual
    // colors at X and Y coordinates using
    // bmp_resource_get_pixel(resource, x, y)
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
 * Converts integers to little endian bytes
 *
 * @param value      Unsigned integer
 * @param pad_length Padding length
 * @param pad_left   True pads left (default), False pads right
 * @return           Little-endian (LE) bytes
 */
function bmp_little_endian_int(value, pad_length = 2, pad_left = true) {
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
 * Converts bytes from little endian to integers
 *
 * @param value Bytes to integer
 * @return      Integer
 */
function bmp_little_endian_byte(value) {
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
 * @param width  Width  (X axis) of the image (non-zero)
 * @param height Height (Y axis) of the image (non-zero)
 * @return       BMPJS Resource
 */
function bmp_resource_create(width, height) {
    var header      = bmp_header_parts;
    var header_raw  = "";
    var padding     = width % 4;
    var bitmap      = bmp_create_array_pixel(width, height);
    var bitmap_size = width * height * 3 + (height * padding);

    header.forEach(function(header_object, header_index) {
        switch (header_index) {
            case BMP_HEADER_FILESIZE:
                header_raw += bmp_little_endian_int(bitmap_size + 54, 8);
                return;

            case BMP_HEADER_WIDTH:
                header_raw += bmp_little_endian_int(width, 8);
                return;

            case BMP_HEADER_HEIGHT:
                header_raw += bmp_little_endian_int(height, 8);
                return;

            case BMP_HEADER_BITMAPSIZE:
                header_raw += bmp_little_endian_int(bitmap_size, 8);
                return;
        }

        if (header[header_index].data != null)
            header_raw += header[header_index].data;
    });

    return {
        header:      byte_to_uint8array(header_raw),
        header_size: header_raw.length,
        header_raw:  header_raw,
        width:       width,
        height:      height,
        bitmap:      bitmap,
        bitmap_raw:  null,
        bitmap_size: bitmap_size,
        padding:     padding
    };
}

/**
 * Verify that the BMP resource is valid
 *
 * @param resource Reference to the resource created by bmp_resource_create()
 * @param raw      Process raw data
 * @return         false | true
 */
function bmp_resource_valid(resource, raw = false) {
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
 * Retrieve pixel RGB value from X, Y coordinate of a resource
 *
 * @param resource Reference to the resource created by bmp_resource_create()
 * @param x        X axis
 * @param y        Y axis
 * @return         [R, G, B]
 */
function bmp_resource_get_pixel(resource, x, y) {
    // WARN(oxou): Fallback to 0,0,0 if out of bounds.
    if (x > resource.width - 1 || y > resource.height - 1 || 0 > x || 0 > y)
        return [0, 0, 0];

    var bytes_per_pixel = 3;

    x = Math.floor(x) * bytes_per_pixel;
    y = Math.floor(y) * bytes_per_pixel;

    // This flips the image upside down. Necessary because BMP uses the
    // bottom-up approach to reading pixels.
    y = Math.abs( y - (resource.height * bytes_per_pixel) + bytes_per_pixel );
    var pos = (resource.width + (resource.padding / bytes_per_pixel)) * y + x;

    var b = clamp(Math.floor(Number(resource.bitmap[pos + 0])), 0, 255);
    var g = clamp(Math.floor(Number(resource.bitmap[pos + 1])), 0, 255);
    var r = clamp(Math.floor(Number(resource.bitmap[pos + 2])), 0, 255);

    // WARN(oxou): We need this to fix the issue with bin2hex errors.
    r = isNaN(r) ? 0 : r;
    g = isNaN(g) ? 0 : g;
    b = isNaN(b) ? 0 : b;

    return [r, g, b];
}

/**
 * Set pixel RGB value at X, Y coordinate of a resource
 *
 * @param resource Reference to the resource created by bmp_resource_create()
 * @param x        X axis
 * @param y        Y axis
 * @param r        Color channel Red
 * @param g        Color channel Green
 * @param b        Color channel Blue
 * @return         true
 */
function bmp_resource_set_pixel(resource, x, y, r = null, g = null, b = null) {
    // WARN(oxou): Fake set_pixel success if out of bounds.
    if (x > resource.width - 1 || y > resource.height - 1 || 0 > x || 0 > y)
        return true;

    r = clamp(Math.floor(Number(r)), 0, 255);
    g = clamp(Math.floor(Number(g)), 0, 255);
    b = clamp(Math.floor(Number(b)), 0, 255);

    // WARN(oxou): We need this to fix the issue with bin2hex errors.
    r = isNaN(r) ? 0 : r;
    g = isNaN(g) ? 0 : g;
    b = isNaN(b) ? 0 : b;

    var bytes_per_pixel = 3;

    x = Math.floor(x) * bytes_per_pixel;
    y = Math.floor(y) * bytes_per_pixel;

    // This flips the image upside down. Necessary because BMP uses the
    // bottom-up approach to reading pixels.
    y = Math.abs( y - (resource.height * bytes_per_pixel) + bytes_per_pixel );
    var pos = (resource.width + (resource.padding / bytes_per_pixel)) * y + x;

    resource.bitmap[pos + 0] = b;
    resource.bitmap[pos + 1] = g;
    resource.bitmap[pos + 2] = r;

    return true;
}

/**
 * Converts resource.bitmap array into raw bytes and mutates
 * resource.bitmap_raw property
 *
 * @param resource BMPJS Resource
 * @return         true
 */
function bmp_resource_bitmap_to_bytes(resource) {
    var bitmap = resource.bitmap;
    var w      = resource.width;
    var p      = resource.padding;
    var strpad = "";

    bitmap = [...bitmap]; // Convert Uint8Array to a standard Array
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
 * Returns the image width and height for a BMPJS resource
 *
 * @param resource Reference to the resource created by bmp_resource_create()
 * @return         [width, height]
 */
function bmp_resource_get_image_size(resource) {
    if (!bmp_resource_valid(resource))
        return false;

    return [resource.width, resource.height];
}

/**
 * Returns the bitmap from a BMPJS resource (if valid)
 *
 * @param resource Reference to the resource created by bmp_resource_create()
 * @return         BMPJS Resource Uint8Array Bitmap
 */
function bmp_resource_get_image_bitmap(resource) {
    if (!bmp_resource_valid(resource))
        return false;

    return resource.bitmap;
}

/**
 * Creates a Uint8Array containing RGB values with the appropriate size
 *
 * @param width  Width  (X axis) of the image (non-zero)
 * @param height Height (Y axis) of the image (non-zero)
 * @return       Uint8Array
 */
function bmp_create_array_pixel(width, height) {
    var buffer = new Uint8Array(width * height * 3 + (height * (width % 4)));
    return buffer;
}

/**
 * Creates a Blob URI with fully-constructed BMP data
 *
 * @param resource Reference to the resource created by bmp_resource_create()
 * @return         The Blob URI containing fully-constructed BMP data
 */
function bmp_create_uri(resource) {
    var blob = new Blob(
        [
            resource.header,
            resource.bitmap
        ],
        {
            type: "image/bmp"
        }
    );
    var url = URL.createObjectURL(blob);

    return url;
}

/**
 * Creates an `img` element that is appended to the `target`
 * The image element src is set to the output of `bmp_create_uri(resource)`
 *
 * @param resource Reference to the resource created by bmp_resource_create()
 * @param target   HTMLElement in which the image will be appended to
 * @return         false | Reference to the `img` element
 */
function bmp_resource_spawn(resource, target = null) {
    if (!bmp_resource_valid(resource))
        return false;

    if (target == null)
        return false;

    var image = document.createElement("img");
    image.src = bmp_create_uri(resource);

    target.appendChild(image);

    // Return reference to the image element
    return image;
}

/**
 * Replace the URI from the old `img` element referenced through `target`
 * by creating a new one by `resource`
 *
 * @param resource Reference to the resource created by bmp_resource_create()
 * @param target   `img` element pointing to a previous reference returned by
 *                 bmp_resource_spawn()
 * @return         false | true
 */
function bmp_resource_replace(resource, target = null) {
    if (!bmp_resource_valid(resource))
        return false;

    if (target == null)
        return false;

    target.src = bmp_create_uri(resource);

    return true;
}

/* TODO(oxou): Streamline this function */
/**
 * Determine the file size of the BMPJS resource based on resource properties
 *
 * @param resource Reference to the resource created by bmp_resource_create()
 * @return         Number
 */
function bmp_resource_filesize(resource) {
    var w = resource.width,
        h = resource.height,
        p = resource.padding;
    return Number(w * h * 3 + (h * p) + 54);
}

/**
 * Decode raw Bitmap bytes to a BMPJS resource object
 *
 * @param bytes Raw bytes of a valid BMP file
 * @return      BMPJS resource
 */
function bmp_resource_create_from_bytes(bytes) {
    if (!bmp_resource_valid(bytes, true))
        return false;

    //
    // NOTE(oxou):
    // Retrieve header size from BMP. Without this we can assume that the
    // header is 54 bytes in length, but this may not always be true.
    // In case we can't retrieve the header size, we fallback to 54.
    // Unfortunately this will almost likely cause problems that are
    // unfixable, as far as I know.
    //
    var header_offset = bmp_little_endian_byte(
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
    var padding  = 0;

    width    = bmp_little_endian_byte(width);
    height   = bmp_little_endian_byte(height);
    bitdepth = bmp_little_endian_byte(bitdepth);
    padding  = width % 4;

    bitmap = byte_to_uint8array(bitmap);

    var resource = bmp_resource_create(width, height);
    resource.bitmap = bitmap;

    return resource;
}

/**
 * Request a BMP file from a remote location using synchronous XMLHttpRequest.
 *
 * Thanks to: https://tinyurl.com/SendingAndReceivingBinaryData
 *
 * @param url URL pointing to a BMP file
 * @return    false | null | string
 */
function bmp_resource_request(url = null) {
    if (url == null)
        return false;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    xhr.send();

    if (xhr.status != 200)
        return null;

    //
    // WARN(oxou): Had to come up with a solution to remove preceeding 0x7F
    // bytes, which caused misalignment and overall incorrect response of the
    // data. This "hack" solves that issue, but I do not know how stable it is.
    // I've tried several files and it seems to just "work." I hope it stays
    // that way.
    //
    data = xhr.response.split('');
    var data_len = data.length;

    for (var i = 0; i < data_len; i++) {
        var value = bin2hex(data[i]);

        if (value.length > 2) {
            value = value.substr(2, 2);
            data[i] = hex2bin(value);
        }
    }

    return data.join('');
}

/**
 * Uses structuredClone() to copy the resource object without reference.
 *
 * @param resource BMPJS Resource
 * @return         BMPJS Resource | false
 */
function bmp_resource_copy(resource) {
    if (!bmp_resource_valid(resource))
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
function bmp_resource_download(resource, filename = "download.bmp") {
    if (!bmp_resource_valid(resource))
        return false;

    var anchor      = document.createElement('a');
    anchor.href     = bmp_create_uri(resource);
    anchor.download = filename;
    anchor.style    = "display:none";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    return true;
}
